import { random, sample, times } from "lodash";
import { dijkstra, dijkstraReverse } from "../lib/dijkstra";
import ecs, { cache, player, gameState } from "../state/ecs";
import { chars, colors } from "../lib/graphics";
import { grid } from "../lib/canvas";
import { cellToId, getNeighborIds } from "../lib/grid";
import { movableEntities } from "../queries";

const kill = (entity) => {
  entity.add("IsDead");
  entity.remove("Layer400");
  entity.add("Layer300");
  entity.remove("IsBlocking");
  entity.appearance.char = chars.corpse;
  entity.remove("Brain");
};

const hit = (targetEntity) => {
  targetEntity.fireEvent("take-damage", { amount: 5 });

  splatterBlood(targetEntity);

  if (!targetEntity.has("Animate")) {
    targetEntity.add("Animate", {
      animation: {
        type: "color",
        stops: [
          colors.damage,
          targetEntity.appearance.currentColor || targetEntity.appearance.color,
        ],
      },
    });
  }
};

const splatterBlood = (entity) => {
  const neighborIds = getNeighborIds(entity.position, "ALL");
  const locIds = [];

  times(random(0, 8), () => locIds.push(sample(neighborIds)));

  locIds.forEach((locId) => {
    cache.readSet("entitiesAtLocation", locId).forEach((x) => {
      ecs.getEntity(x).add("Soilage", {
        // color: sample(colors.blood),
        color: colors.blood[3],
        name: "blood",
        sourceEntityId: entity.id,
        sourceName: entity.name.nomen,
      });
    });
  });
};

const bumpAttack = (targetEntity) => {
  if (targetEntity.health) {
    hit(targetEntity);

    if (targetEntity.health.current <= 0) {
      kill(targetEntity);
    }
  }
};

const washInFountain = (targetEntity, fountain) => {
  if (targetEntity.has("Soilage")) {
    if (fountain.has("Soilage")) {
      console.log("You can't clean yourself in this foul fountain");
    } else {
      targetEntity
        .get("Soilage")
        .forEach((x) => fountain.add("Soilage", { ...x.serialize() }));
      targetEntity.fireEvent("clean");
    }
  }
};

export const movement = () => {
  movableEntities.get().forEach((entity) => {
    let mPos = { x: entity.moveTo.x, y: entity.moveTo.y };
    if (entity.moveTo.relative) {
      mPos = {
        x: entity.position.x + entity.moveTo.x,
        y: entity.position.y + entity.moveTo.y,
      };
    }

    const { width, height, x, y } = grid.map;

    // observe map boundaries
    const mx = Math.min(width + x - 1, Math.max(x, mPos.x));
    const my = Math.min(height + y - 1, Math.max(y, mPos.y));

    let blockers = [];

    const locId = cellToId({ x: mx, y: my });
    const entitiesAtLoc = cache.readSet("entitiesAtLocation", locId);

    entitiesAtLoc.forEach((eid) => {
      const potentialBlocker = ecs.getEntity(eid);
      if (potentialBlocker.isBlocking) {
        blockers.push(potentialBlocker);
      }
    });

    if (blockers.length) {
      blockers.forEach((blocker) => {
        // if has brain and not the same species - bump attack
        if (blocker.brain && entity.name.nomen !== blocker.name.nomen) {
          bumpAttack(blocker);
        }

        if (blocker.name.nomen === "fountain") {
          washInFountain(entity, blocker);
        }
      });
      return entity.remove("MoveTo");
    }

    // update cache
    cache.delete("entitiesAtLocation", cellToId(entity.position), entity.id);
    cache.addSet("entitiesAtLocation", cellToId({ x: mx, y: my }), entity.id);

    if (entity.id === player.id && gameState.playerTurn) {
      const playerDijkstraMap = dijkstra([{ x: mx, y: my }]);
      const playerReverse = dijkstraReverse(playerDijkstraMap);

      cache.addObj("dijkstraMaps", "player", playerDijkstraMap);
      cache.addObj("dijkstraMaps", "playerReverse", playerReverse);
    }

    entity.position.x = mx;
    entity.position.y = my;

    entity.remove("MoveTo");
  });
};
