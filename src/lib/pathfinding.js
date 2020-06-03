import PF from "pathfinding";
import { get, some, times } from "lodash";
import ecs, { cache } from "../state/ecs";
import { sample } from "lodash";
import { ALL, toCell, getNeighborIds } from "./grid";

export const drunkenWalk = () => sample(ALL);

export const walkDijkstra = (entity, dMapName) => {
  const neighbors = getNeighborIds(entity.position, "ALL");
  const inf = 1000000;
  let score = inf;
  let nextPosition = {};
  neighbors.forEach((locId) => {
    const dScore = get(cache, `dijkstraMaps[${dMapName}][${locId}]`, inf);
    if (dScore < score) {
      score = dScore;
      nextPosition = toCell(locId);
    }
  });
  return nextPosition;
};

const baseMatrix = [];
times(34, () => baseMatrix.push(new Array(100).fill(0)));

export const aStar = (start, goal) => {
  const matrix = [...baseMatrix];

  Object.keys(cache.entitiesAtLocation).forEach((locId) => {
    if (
      some([...cache.readObj("entitiesAtLocation", locId)], (eId) => {
        return ecs.getEntity(eId).isBlocking;
      })
    ) {
      const cell = toCell(locId);

      matrix[cell.y][cell.x] = 1;
    }
  });

  matrix[start.y][start.x] = 0;
  matrix[goal.y][goal.x] = 0;

  const grid = new PF.Grid(matrix);
  const finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true,
  });

  const path = finder.findPath(start.x, start.y, goal.x, goal.y, grid);

  return path;
};
