import { compact, random } from "lodash";
import { rectangle, rectsIntersect, isOnMapEdge, randomNeighbor } from "./grid";

function digHorizontalPassage(tiles, x1, x2, y) {
  const start = Math.min(x1, x2);
  const end = Math.max(x1, x2) + 1;
  let x = start;

  while (x < end) {
    tiles[`${x},${y}`] = { x, y, sprite: "FLOOR" };
    x++;
  }
}

function digVerticalPassage(tiles, y1, y2, x) {
  const start = Math.min(y1, y2);
  const end = Math.max(y1, y2) + 1;
  let y = start;

  while (y < end) {
    tiles[`${x},${y}`] = { x, y, sprite: "FLOOR" };
    y++;
  }
}

const digDrunkenWalk = (x, y, tiles) => {
  let loc = randomNeighbor(x, y);
  // if new loc is a tile and not on the map edge
  if (tiles[`${[loc.x]},${[loc.y]}`] && !isOnMapEdge(loc.x, loc.y)) {
    tiles[`${loc.x},${loc.y}`] = {
      x: loc.x,
      y: loc.y,
      sprite: "CAVERN_FLOOR"
    };
    return { x: loc.x, y: loc.y };
  } else {
    return { x, y };
  }
};

export const generateDungeon = ({
  x,
  y,
  width,
  height,
  maxRoomCount,
  minRoomSize,
  maxRoomSize
}) => {
  // fill the entire space with walls so we can dig it out later
  const { tiles } = rectangle(
    { x, y, width, height },
    { sprite: "WALL", blocking: true, opaque: true }
  );

  const rooms = [];
  let roomTiles = {};

  for (let r of Array(maxRoomCount).keys()) {
    let rw = random(minRoomSize, maxRoomSize);
    let rh = random(minRoomSize, maxRoomSize);
    let rx = random(x, width + x - rw - 1);
    let ry = random(y, height + y - rh - 1);

    // create a candidate room
    // todo: perf - don't bother filling this in here - wait till it's accepted
    const candidate = rectangle(
      { x: rx, y: ry, width: rw, height: rh, hasWalls: true },
      { sprite: "FLOOR", blocking: false, opaque: false }
    );

    if (!rooms.some(room => rectsIntersect(room, candidate))) {
      rooms[r] = candidate;
      roomTiles = { ...roomTiles, ...candidate.tiles };
    }
  }

  let prevRoom = null;

  for (let room of compact(rooms)) {
    if (prevRoom) {
      const prev = prevRoom.center;
      const curr = room.center;

      if (random(0, 1)) {
        digHorizontalPassage(tiles, prev.x, curr.x, curr.y);
        digVerticalPassage(tiles, prev.y, curr.y, prev.x);
      } else {
        digVerticalPassage(tiles, prev.y, curr.y, prev.x);
        digHorizontalPassage(tiles, prev.x, curr.x, curr.y);
      }
    }

    prevRoom = room;
  }

  const processedTiles = { ...tiles, ...roomTiles };
  let digLoc = { x: x + Math.floor(width / 2), y: Math.floor(y + height / 2) };

  for (let i = 0; i < 1000; i++) {
    digLoc = digDrunkenWalk(digLoc.x, digLoc.y, processedTiles);
  }

  const openTileIds = Object.keys(processedTiles).filter(
    tileId => !processedTiles[tileId].blocking
  );

  return { tiles: processedTiles, start: rooms[0].center, openTileIds, rooms };
};
