import { random } from "lodash";
import { cache, player } from "../state/ecs";
import { aiEntities, aiEntitiesInFov } from "../queries";
import { drunkenWalk, walkDijkstra } from "../lib/pathfinding";
import { toLocId } from "../lib/grid";

const moveToPlayer = (entity) => {
  if (random(0, 20) > 1) {
    const newLoc = walkDijkstra(entity, "player");
    if (Object.keys(newLoc).length) {
      if (entity.has("IsInFov")) {
        entity.add("MoveTo", { ...newLoc, relative: false });
      }
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

const meander = (entity, frequency = 1, stickiness = 4) => {
  if (random(1, frequency) === 1) {
    let m = drunkenWalk();

    // do we have a previous location?
    if (entity.position.px && entity.position.py) {
      // are we stuck in the same direction?
      if (random(1, stickiness) < stickiness) {
        // yes - keep going in the same direction
        m = {
          x: entity.position.x - entity.position.px,
          y: entity.position.y - entity.position.py,
        };
      }
    }

    const newLoc = m;

    if (entity.has("IsInFov")) {
      entity.add("MoveTo", { ...newLoc, relative: true });
    }
  }
};

export const ai = () => {
  aiEntities.get().forEach((entity) => {
    if (entity.brain.ai === "goblin") {
      // if player is covered in blood - run away!
      if (player.has("Soilage")) {
        moveAwayFromPlayer(entity);
      } else {
        const distance = cache.readObj("dijkstraMaps", "player")[
          toLocId(entity.position)
        ];

        // should add a component of some sort that will track if an enemy has spotted the player.
        // being in FOV is a cheap shortcut that only works so-so
        if (
          distance > 4 ||
          [...aiEntitiesInFov.get()].filter((x) => x.name.nomen === "goblin")
            .length > 1
        ) {
          moveToPlayer(entity);
        } else {
          moveAwayFromPlayer(entity);
        }
      }
    }

    if (entity.brain.ai === "skeleton") {
      if (player.has("Soilage")) {
        moveToPlayer(entity);
      } else {
        meander(entity);
      }
    }

    if (entity.brain.ai === "gelatinousCube") {
      meander(entity);
    }
  });
};
