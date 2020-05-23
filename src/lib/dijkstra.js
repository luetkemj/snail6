import { some } from "lodash";
import ecs, { cache } from "../state/ecs";
import { cellToId, getNeighborIds, idToCell } from "./grid";

// goals: Array of { x, y } positions
export const dijkstra = (goals, weights = []) => {
  const frontier = goals.map(cellToId);

  const distance = frontier.reduce((acc, val, idx) => {
    acc[val] = weights[idx] || 0;
    return acc;
  }, {});

  while (frontier.length) {
    const current = frontier.shift();

    // current entity position component
    const cell = idToCell(current);
    const neighborLocIds = getNeighborIds(cell);

    neighborLocIds.forEach((neighborId) => {
      if (!distance[neighborId]) {
        const neighborIds = cache.readSet("entitiesAtLocation", neighborId);
        if (
          // check if location exists and is NOT blocking (no entity at location can be blocking)
          (neighborIds && !some(neighborIds),
          (x) => {
            ecs.getEntity(x).has("IsBlocking");
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
    const id = cellToId(goal);
    distance[id] = weights[idx] || 0;
  });

  return distance;
};
