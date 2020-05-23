import { get, random, some } from "lodash";
import ecs, { cache } from "../state/ecs";
import { colors } from "../lib/graphics";
import { generateDungeon } from "../lib/dungeon";
import { grid } from "../lib/canvas";
import { cellToId, getNeighborIds } from "../lib/grid";
import CanDijkstra from "../components/CanDijkstra";

const initDungeonLevel = () => {
  // create dungeon level
  const dungeon = generateDungeon({
    x: grid.map.x,
    y: grid.map.y,
    width: grid.map.width,
    height: grid.map.height,
    maxRoomCount: 30,
    minRoomSize: 6,
    maxRoomSize: 12,
  });

  Object.keys(dungeon.tiles).forEach((tileId) => {
    const currTile = dungeon.tiles[tileId];

    // Only make entities for tiles can be seen
    if (
      some(getNeighborIds(currTile, "ALL"), (locId) => {
        return get(dungeon, `tiles.${locId}.sprite`, "WALL") !== "WALL";
      })
    ) {
      let entity;

      if (currTile.sprite === "WALL") {
        entity = ecs.createPrefab("WallPrefab", {
          position: { x: currTile.x, y: currTile.y },
        });
      }

      if (currTile.sprite === "FLOOR") {
        entity = ecs.createPrefab("FloorPrefab", {
          position: { x: currTile.x, y: currTile.y },
        });
        entity.add(CanDijkstra);
      }

      if (currTile.sprite === "CAVERN_FLOOR") {
        entity = ecs.createPrefab("FloorPrefab", {
          position: { x: currTile.x, y: currTile.y },
        });
        entity.appearance.color = colors.cavernFloor;
        entity.add(CanDijkstra);
      }

      const locId = cellToId(currTile);
      cache.addSet("entitiesAtLocation", locId, entity.id);
    }
  });

  dungeon.rooms.forEach((room, index) => {
    if (index !== 0 && random(1, 3) === 1) {
      const entity = ecs.createPrefab("BonfirePrefab", {
        position: room.center,
      });

      const locId = cellToId(room.center);
      cache.addSet("entitiesAtLocation", locId, entity.id);
    }
  });

  return dungeon;
};

export default initDungeonLevel;
