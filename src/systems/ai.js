import { player } from "../state/ecs";
import { aiEntities } from "../queries";
import { drunkenWalk, walkDijkstra } from "../lib/pathfinding";

const moveToPlayer = (entity) => {
  const newLoc = walkDijkstra(entity, "player");
  if (Object.keys(newLoc).length) {
    if (entity.has("IsInFov")) {
      entity.add("MoveTo", { ...newLoc, relative: false });
    }
  }
};

const moveAwayFromPlayer = (entity) => {
  const newLoc = walkDijkstra(entity, "playerReverse");
  if (Object.keys(newLoc).length) {
    if (entity.has("IsInFov")) {
      entity.add("MoveTo", { ...newLoc, relative: false });
    }
  }
};

export const ai = () => {
  aiEntities.get().forEach((entity) => {
    // if player is covered in blood - run away!
    if (player.has("Soilage")) {
      console.log("covered in blood!");
      moveAwayFromPlayer(entity);
    } else {
      console.log("ATTACK!!!!");
      moveToPlayer(entity);
    }
  });
};
