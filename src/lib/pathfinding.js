import { get } from "lodash";
import { cache } from "../state/ecs";
import { sample } from "lodash";
import { CARDINAL, toLocId, getNeighbors } from "./grid";

export const drunkenWalk = () => sample(CARDINAL);

export const walkDijkstra = (entity, dMapName) => {
  const neighbors = getNeighbors(entity.position);

  const inf = 1000000;
  let score = inf;
  let nextPosition = {};
  neighbors.forEach((n) => {
    const locId = toLocId(n);
    const dScore = get(cache, `dijkstraMaps[${dMapName}][${locId}]`, inf);
    if (dScore < score) {
      score = dScore;
      nextPosition = n;
    }
  });
  return nextPosition;
};
