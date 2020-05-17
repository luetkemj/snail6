import ecs, { cache, player } from "../state/ecs";
import { grid } from "../lib/canvas";
import createFOV from "../lib/fov";

import IsInFov from "../components/IsInFov";
import IsRevealed from "../components/IsRevealed";

import { inFovEntities, renderableEntities, opaqueEntities } from "../queries";

export const fov = () => {
  const { width, height } = grid;

  const originX = player.position.x;
  const originY = player.position.y;

  const FOV = createFOV(opaqueEntities, width, height, originX, originY, 100);

  // try doing this from FOV.fov and checking entities at location cache to speed up!
  // console.log({ FOV });

  // clear out stale fov
  inFovEntities.get().forEach((x) => x.remove(IsInFov));

  FOV.fov.forEach((locId) => {
    const entitiesAtLoc = cache.read("entitiesAtLocation", locId);

    if (entitiesAtLoc) {
      entitiesAtLoc.forEach((eId) => {
        const entity = ecs.getEntity(eId);
        entity.add(IsInFov);

        if (entity.light && entity.light.a > 0) {
          if (!entity.isRevealed) {
            entity.add(IsRevealed);
          }
        }
      });
    }
    // cache.read("entitiesAtLocation", locId).forEach((eId) => {
    //   const entity = ecs.getEntity(eId);
    //   entity.add(IsInFov);

    //   if (entity.light && entity.light.a > 0) {
    //     if (!entity.isRevealed) {
    //       entity.add(IsRevealed);
    //     }
    //   }
    // });
  });

  // renderableEntities.get().forEach((entity) => {
  //   const locId = `${entity.position.x},${entity.position.y}`;

  //   if (FOV.fov.has(locId)) {
  //     if (!entity.isInFov) {
  //       entity.add(IsInFov);
  //     }

  //     if (entity.light && entity.light.a > 0) {
  //       if (!entity.isRevealed) {
  //         entity.add(IsRevealed);
  //       }
  //     }
  //   } else {
  //     if (entity.isInFov) {
  //       entity.remove(IsInFov);
  //     }
  //   }
  // });
};
