import { some } from "lodash";
import ecs, { cache } from "../state/ecs";
import { toLocId, getNeighborIds, toCell } from "./grid";

// goals: Array of { x, y } positions
export const dijkstra = (goals, weights = []) => {
  const frontier = goals.map(toLocId);

  const distance = frontier.reduce((acc, val, idx) => {
    acc[val] = weights[idx] || 0;
    return acc;
  }, {});

  while (frontier.length) {
    const current = frontier.shift();

    // current entity position component
    const cell = toCell(current);
    const neighborLocIds = getNeighborIds(cell);

    neighborLocIds.forEach((neighborId) => {
      if (!distance[neighborId]) {
        const neighborIds = [
          ...cache.readSet("entitiesAtLocation", neighborId),
        ];
        if (
          // check if location exists and is NOT blocking (no entity at location can be blocking)
          neighborIds &&
          !some(neighborIds, (x) => {
            return ecs.getEntity(x).has("IsBlocking");
          })
        ) {
          let dscore = distance[current] + 1;
          distance[neighborId] = dscore;
          frontier.push(neighborId);
        }
      }
    });
  }

  // normalize goals to their weights or 0
  goals.forEach((goal, idx) => {
    const id = toLocId(goal);
    distance[id] = weights[idx] || 0;
  });

  return distance;
};

export const dijkstraReverse = (dMap, coeff = -1.2) => {
  const dR = {};

  Object.keys(dMap).forEach((x) => {
    dR[x] = dMap[x] * coeff;
  });

  const goals = Object.keys(dR);
  const weights = goals.map((x) => dR[x]);

  return dijkstra(goals, weights);
};
