import { random, sample, times } from "lodash";
import { dijkstra, dijkstraReverse } from "../lib/dijkstra";
import ecs, { cache, player, gameState } from "../state/ecs";
import { CLEAN, OBSERVE, SOIL, TAKE_DAMAGE } from "../state/events";
import { chars, colors } from "../lib/graphics";
import { grid } from "../lib/canvas";
import { toLocId, getNeighborIds } from "../lib/grid";
import { aiEntities, movableEntities } from "../queries";
import { log } from "../lib/adventure-log";

import { aStar } from "../lib/pathfinding";

export const nuke = () => {
  log({ text: `NUKE!`, fg: "orange" });
  aiEntities.get().forEach((entity) => {
    if (entity.name.nomen !== "player") {
      kill(entity);
    }
  });
};

const kill = (entity) => {
  entity.add("IsDead");
  entity.remove("Layer400");
  entity.add("Layer300");
  entity.remove("IsBlocking");
  entity.remove("Brain");
  if (!entity.has("isBoneless")) {
    entity.appearance.char = chars.corpse;
  }

  if (entity.has("isBoneless")) {
    entity.appearance.background = "transparent";
    entity.appearance.currentBackground = "transparent";
  }
  splatterBlood(entity, self);
  entity.fireEvent("kill");
};

const hit = (targetEntity) => {
  targetEntity.fireEvent(TAKE_DAMAGE, { amount: 5 });

  if (targetEntity.has("Blood")) {
    splatterBlood(targetEntity);
  }

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

export const splatterBlood = (entity, splatterSelf = false) => {
  if (!entity.blood) return;
  const neighborIds = getNeighborIds(entity.position, "ALL");
  const locIds = [];

  if (splatterSelf) {
    locIds.push(toLocId(entity.position));
  }

  times(random(0, 8), () => locIds.push(sample(neighborIds)));

  locIds.forEach((locId) => {
    cache.readSet("entitiesAtLocation", locId).forEach((x) => {
      const e = ecs.getEntity(x);

      e.add("Soilage", {
        color: entity.blood.color,
        name: "blood",
        sourceEntityId: entity.id,
        sourceName: entity.name.nomen,
      });
      e.fireEvent(SOIL, { text: `${entity.name.nomen} blood` });
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
      log({
        text: `The fountain is filled with ${fountain.soilage[0].sourceName} ${fountain.soilage[0].name}.`,
      });
    } else {
      log({ text: `${targetEntity.name.nomen} bathes in the fountain.` });
      targetEntity
        .get("Soilage")
        .forEach((x) => fountain.add("Soilage", { ...x.serialize() }));
      targetEntity.fireEvent(CLEAN);
    }
  } else {
    if (fountain.has("Soilage")) {
      log({
        text: `The fountain is filled with ${fountain.soilage[0].sourceName} ${fountain.soilage[0].name}.`,
      });
    } else {
      log({ text: `A fountain full of fresh clean water.` });
    }
  }
};

const absorb = (entity) => {
  // get all entities at loc excluding self
  const entitiesAtLoc = cache.readSet(
    "entitiesAtLocation",
    toLocId(entity.position)
  );

  entitiesAtLoc.forEach((eId) => {
    if (eId !== entity.id) {
      const cEntity = ecs.getEntity(eId);
      if (cEntity.has("Soilage")) {
        // clone all soilage and add to self
        cEntity
          .get("Soilage")
          .forEach((x) => entity.add("Soilage", { ...x.serialize() }));
        cEntity.fireEvent(CLEAN);
      }

      // todo: should actually put the entity into it's inventory (will need to include items eventually)
      if (cEntity.has("isDead")) {
        cache.delete(
          "entitiesAtLocation",
          toLocId(cEntity.position),
          cEntity.id
        );
        cEntity.destroy();
      }
    }
  });
};

export const movement = () => {
  movableEntities.get().forEach((entity) => {
    aStar(entity.position, player.position);

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

    const locId = toLocId({ x: mx, y: my });
    const entitiesAtLoc = cache.readSet("entitiesAtLocation", locId);

    if (entitiesAtLoc) {
      entitiesAtLoc.forEach((eid) => {
        const potentialBlocker = ecs.getEntity(eid);

        if (entity.name.nomen === "player") {
          potentialBlocker.fireEvent(OBSERVE);
        }

        if (potentialBlocker.isBlocking) {
          blockers.push(potentialBlocker);
        }
      });
    }

    if (blockers.length) {
      blockers.forEach((blocker) => {
        // if has brain and not the same species - bump attack
        if (
          (blocker.brain || blocker.name.nomen === "player") &&
          entity.name.nomen !== blocker.name.nomen
        ) {
          log({ text: `${entity.name.nomen} hits ${blocker.name.nomen}` });
          bumpAttack(blocker);
        }

        if (blocker.name.nomen === "fountain") {
          washInFountain(entity, blocker);
        }
      });
      return entity.remove("MoveTo");
    }

    if (entity.has("canAbsorb")) {
      absorb(entity);
    }

    // update cache
    cache.delete("entitiesAtLocation", toLocId(entity.position), entity.id);
    cache.addSet("entitiesAtLocation", toLocId({ x: mx, y: my }), entity.id);

    if (entity.id === player.id && gameState.playerTurn) {
      const playerDijkstraMap = dijkstra([{ x: mx, y: my }]);
      const playerReverse = dijkstraReverse(playerDijkstraMap);

      cache.addObj("dijkstraMaps", "player", playerDijkstraMap);
      cache.addObj("dijkstraMaps", "playerReverse", playerReverse);
    }

    entity.position.px = entity.position.x;
    entity.position.py = entity.position.y;
    entity.position.x = mx;
    entity.position.y = my;

    entity.remove("MoveTo");
  });
};
