import { aiEntities } from "../queries";
import { drunkenWalk, walkDijkstra } from "../lib/pathfinding";

export const ai = () => {
  aiEntities.get().forEach((entity) => {
    // const newLoc = drunkenWalk(entity);
    const newLoc = walkDijkstra(entity, "player");
    if (Object.keys(newLoc).length) {
        if (entity.has('IsInFov')) {
            entity.add("MoveTo", { ...newLoc, relative: false });
        }
    }
  });
};
