import ecs, { player } from "../state/ecs";
import { grid } from "../lib/canvas";
import createFOV from "../lib/fov";

import Appearance from "../components/Appearance";
import IsInFov from "../components/IsInFov";
import IsOpaque from "../components/IsOpaque";
import IsRevealed from "../components/IsRevealed";
import Position from "../components/Position";

const entities = ecs.createQuery({
  all: [Position, Appearance],
});

const opaqueEntities = ecs.createQuery({
  all: [IsOpaque],
});

export const fov = () => {
  const { width, height } = grid;

  const originX = player.position.x;
  const originY = player.position.y;

  const FOV = createFOV(opaqueEntities, width, height, originX, originY, 100);

  entities.get().forEach((entity) => {
    const locId = `${entity.position.x},${entity.position.y}`;

    if (FOV.fov.includes(locId)) {
      if (!entity.isInFov) {
        entity.add(IsInFov);
      }

      if (entity.light && entity.light.a > 0) {
        if (!entity.isRevealed) {
          entity.add(IsRevealed);
        }
      }
    } else {
      if (entity.isInFov) {
        entity.remove(IsInFov);
      }
    }
  });
};
