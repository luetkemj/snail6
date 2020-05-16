import ecs, { cache } from "../state/ecs";

import { generateDungeon } from "../lib/dungeon";
import { grid } from "../lib/canvas";
import { cellToId } from "../lib/grid";

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
    }

    if (currTile.sprite === "CAVERN_FLOOR") {
      entity = ecs.createPrefab("CavernFloorPrefab", {
        position: { x: currTile.x, y: currTile.y },
      });
    }

    const locId = cellToId(currTile);
    cache.add("entitiesAtLocation", locId, entity.id);
  });

  return dungeon;
};

export default initDungeonLevel;
