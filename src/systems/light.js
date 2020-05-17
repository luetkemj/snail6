import Color from "color";

import ecs, { cache } from "../state/ecs";
import { grid } from "../lib/canvas";
import createFov from "../lib/fov";

import Light from "../components/Light";
import LightSource from "../components/LightSource";
import Position from "../components/Position";
import Appearance from "../components/Appearance";
import IsOpaque from "../components/IsOpaque";

const lightSources = ecs.createQuery({
  all: [LightSource, Position],
});

const litEntities = ecs.createQuery({
  all: [Light],
});

const opaqueEntities = ecs.createQuery({
  all: [IsOpaque],
});

const visibleEntities = ecs.createQuery({
  all: [Position, Appearance],
});

const { width, height } = grid;

export const light = () => {
  // first remove all lights
  litEntities.get().forEach((x) => x.remove("Light"));

  // initial lighting
  lightSources.get().forEach((lsEntity) => {
    const {
      lightSource: { range },
      position: { x: originX, y: originY },
    } = lsEntity;

    const { fov, distance } = createFov(
      opaqueEntities,
      width,
      height,
      originX,
      originY,
      range
    );

    fov.forEach((locId) => {
      const opacity = ((range - distance[locId]) / range) * 100;

      const entitiesAtLoc = cache.read("entitiesAtLocation", locId);

      if (entitiesAtLoc) {
        entitiesAtLoc.forEach((eId) => {
          const entity = ecs.getEntity(eId);

          if (!entity.has("IsOpaque")) {
            if (entity.has("Light")) {
              entity.light.a = entity.light.a + opacity;
            } else {
              entity.add(Light, { a: opacity });
            }

            entity.light.sources.add(lsEntity.id);
          }

          if (entity.has("LightSource")) {
            if (entity.has("Light")) {
              entity.light.a = 100;
            } else {
              entity.add(Light, { a: 100 });
            }

            entity.light.sources.add(lsEntity.id);
          }
        });
      }
    });
  });

  // light source mixing
  litEntities.get().forEach((entity) => {
    const { appearance, light } = entity.components;

    if (light) {
      light.sources.forEach((sourceId) => {
        const { color, weight } = ecs.getEntity(sourceId).lightSource;
        const fg = Color(appearance.color).alpha(light.a / 100);
        const mixedColor = fg.mix(Color(color), weight);
        entity.light.color = mixedColor;
      });
    }
  });

  // lightSources.get().forEach((lsEntity) => {
  //   console.log(lsEntity);
  //   const { range } = lsEntity.lightSource;
  //   const originX = lsEntity.position.x;
  //   const originY = lsEntity.position.y;
  //   const FOV = createFOV(
  //     opaqueLocations,
  //     width,
  //     height,
  //     originX,
  //     originY,
  //     range
  //   );
  //   const { fov, distance } = FOV;
  //   fov.forEach((locId) => {
  //     const opacity = ((range - distance[locId]) / range) * 100;
  //     if (entitiesByLocation[locId]) {
  //       entitiesByLocation[locId].forEach((entityId) => {
  //         const entity = getEntity(entityId);
  //         if (!entity.components.isOpaque) {
  //           if (entity.components.light) {
  //             const a = entity.components.light.a + opacity;
  //             entity.updateComponent("light", { a });
  //           } else {
  //             entity.addComponent("light", { a: opacity });
  //             litEntityIds.push(entity.id);
  //           }
  //           const sources = [...entity.components.light.sources, eId];
  //           entity.updateComponent("light", { sources });
  //         }
  //         if (entity.components.lightsource) {
  //           entity.addComponent("light", { a: 100 });
  //           const sources = [...entity.components.light.sources, eId];
  //           entity.updateComponent("light", { sources });
  //           litEntityIds.push(entity.id);
  //         }
  //       });
  //     }
  //   });
  // });
};
