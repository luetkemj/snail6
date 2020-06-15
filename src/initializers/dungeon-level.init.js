import { get, random, sample, some, times } from "lodash";
import ecs, { cache } from "../state/ecs";
import { colors } from "../lib/graphics";
import { generateDungeon } from "../lib/dungeon";
import { grid } from "../lib/canvas";
import { cellToId, toCell, getNeighborIds } from "../lib/grid";
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
        entity.appearance.color = sample(colors.wall);
      }

      if (currTile.sprite === "FLOOR") {
        entity = ecs.createPrefab("FloorPrefab", {
          position: { x: currTile.x, y: currTile.y },
        });
        entity.appearance.color = sample(colors.floor);
        entity.add(CanDijkstra);
      }

      if (currTile.sprite === "CAVERN_FLOOR") {
        entity = ecs.createPrefab("FloorPrefab", {
          position: { x: currTile.x, y: currTile.y },
        });
        entity.appearance.color = sample(colors.cavernFloor);
        entity.add(CanDijkstra);
      }

      const locId = cellToId(currTile);
      cache.addSet("entitiesAtLocation", locId, entity.id);
    }
  });

  // add bonfires
  dungeon.rooms.forEach((room, index) => {
    if (index !== 0 && random(1, 3) === 1) {
      const locId = cellToId(room.center);
      // make sure the location is empty (only floor tiles should exist here...)
      if (cache.readSet("entitiesAtLocation", locId).size === 1) {
        const entity = ecs.createPrefab("FountainPrefab", {
          position: room.center,
        });

        cache.addSet("entitiesAtLocation", locId, entity.id);
      }
    }
  });

  // add traps
  times(random(1, 3), () => {
    const locId = sample(dungeon.openTileIds);
    if (cache.readSet("entitiesAtLocation", locId).size === 1) {
      const entity = ecs.createPrefab("TrapPrefab", {
        position: toCell(locId),
      });

      cache.addSet("entitiesAtLocation", locId, entity.id);
    }
  });

  // spawn monsters!
  times(random(5, 10), () => {
    const locId = sample(dungeon.openTileIds);
    if (cache.readSet("entitiesAtLocation", locId).size === 1) {
      const entity = ecs.createPrefab("GoblinPrefab", {
        position: toCell(locId),
      });

      cache.addSet("entitiesAtLocation", locId, entity.id);
    }
  });

  times(random(5, 10), () => {
    const locId = sample(dungeon.openTileIds);
    if (cache.readSet("entitiesAtLocation", locId).size === 1) {
      const entity = ecs.createPrefab("SkeletonPrefab", {
        position: toCell(locId),
      });

      cache.addSet("entitiesAtLocation", locId, entity.id);
    }
  });

  times(random(1, 1), () => {
    const locId = sample(dungeon.openTileIds);
    if (cache.readSet("entitiesAtLocation", locId).size === 1) {
      const entity = ecs.createPrefab("GelatinousCubePrefab", {
        position: toCell(locId),
      });

      cache.addSet("entitiesAtLocation", locId, entity.id);
    }
  });

  return dungeon;
};

export default initDungeonLevel;
