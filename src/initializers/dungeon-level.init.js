import ecs from "../state/ecs";

import { generateDungeon } from "../lib/dungeon";
import { grid } from "../lib/canvas";

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

    if (currTile.sprite === "WALL") {
      ecs.createPrefab("WallPrefab", {
        position: { x: currTile.x, y: currTile.y },
      });
    }

    if (currTile.sprite === "FLOOR") {
      ecs.createPrefab("FloorPrefab", {
        position: { x: currTile.x, y: currTile.y },
      });
    }

    if (currTile.sprite === "CAVERN_FLOOR") {
      ecs.createPrefab("CavernFloorPrefab", {
        position: { x: currTile.x, y: currTile.y },
      });
    }
  });

  return dungeon;
};

export default initDungeonLevel;
