import { cache, player } from "../state/ecs";
import { aiEntities, aiEntitiesInFov } from "../queries";
import { drunkenWalk, walkDijkstra } from "../lib/pathfinding";
import { toLocId } from "../lib/grid";

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
      const distance = cache.readObj("dijkstraMaps", "player")[
        toLocId(entity.position)
      ];

      // should add a component of some sort that will track if an enemy has spotted the player.
      // being in FOV is a cheap shortcut that only works so-so
      if (distance > 4 || aiEntitiesInFov.get().size > 1) {
        moveToPlayer(entity);
      } else {
        moveAwayFromPlayer(entity);
      }
    }
  });
};
