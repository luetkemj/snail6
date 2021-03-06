import ecs, { cache, player } from "../state/ecs";
import { grid } from "../lib/canvas";
import createFOV from "../lib/fov";

import IsInFov from "../components/IsInFov";
import IsRevealed from "../components/IsRevealed";

import { inFovEntities, opaqueEntities } from "../queries";

export const fov = () => {
  const { width, height } = grid;

  const originX = player.position.x;
  const originY = player.position.y;

  const FOV = createFOV(opaqueEntities, width, height, originX, originY, 10);

  // clear out stale fov
  inFovEntities.get().forEach((x) => x.remove(IsInFov));

  FOV.fov.forEach((locId) => {
    const entitiesAtLoc = cache.readSet("entitiesAtLocation", locId);

    if (entitiesAtLoc) {
      entitiesAtLoc.forEach((eId) => {
        const entity = ecs.getEntity(eId);
        entity.add(IsInFov);

        if (!entity.has("IsRevealed")) {
          entity.add(IsRevealed);
        }
      });
    }
  });
};
