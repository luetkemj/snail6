import { random, sample, times } from "lodash";
import { dijkstra } from "../lib/dijkstra";
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

const hit = (entity) => {
  entity.fireEvent("take-damage", { amount: 5 });

  splatterBlood(entity);

  if (!entity.has("Animate")) {
    entity.add("Animate", {
      animation: {
        type: "color",
        stops: [
          colors.damage,
          entity.appearance.currentColor || entity.appearance.color,
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
        ecs.getEntity(x).add('Soilage', {
            color: sample(colors.blood),
            name: 'blood',
            sourceEntityId: entity.id,
            sourceName: entity.name.nomen
        })
    });
  });
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
        if (blocker.health) {
          hit(blocker);

          if (blocker.health.current <= 0) {
            kill(blocker);
          }
        }
      });
      return entity.remove("MoveTo");
    }

    // update cache
    cache.delete("entitiesAtLocation", cellToId(entity.position), entity.id);
    cache.addSet("entitiesAtLocation", cellToId({ x: mx, y: my }), entity.id);

    if (entity.id === player.id && gameState.playerTurn) {
      const playerDijkstraMap = dijkstra([{ x: mx, y: my }]);
      cache.addObj("dijkstraMaps", "player", playerDijkstraMap);
    }

    entity.position.x = mx;
    entity.position.y = my;

    entity.remove("MoveTo");
  });
};
