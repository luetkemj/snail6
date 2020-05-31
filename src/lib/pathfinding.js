import { get } from "lodash";
import { cache } from "../state/ecs";
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
