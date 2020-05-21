import Color from "color";

import ecs, { cache, player } from "../state/ecs";
import game from "../state/game";
import { grid } from "../lib/canvas";
import createFov from "../lib/fov";
import { cellToId, getNeighborIds } from "../lib/grid";

import Light from "../components/Light";

import {
  lightSourcesEntities,
  litEntities,
  opaqueEntities,
  opaqueNonLightSourceEntities,
  inFovEntities,
} from "../queries";

const gridWidth = grid.width;
const gridHeight = grid.height;

export const lightSystem = () => {
  // first remove all lights
  litEntities.get().forEach((x) => x.remove("Light"));

  // initial lighting
  lightSourcesEntities.get().forEach((lsEntity) => {
    const {
      lightSource: { range },
      position: { x: originX, y: originY },
    } = lsEntity;

    // if (lsEntity) {
    // if (lsEntity.has("HasMoved") || game.turn === 0) {
    const { fov, distance } = createFov(
      opaqueEntities,
      gridWidth,
      gridHeight,
      originX,
      originY,
      range
    );

    fov.forEach((locId) => {
      const opacity = ((range - distance[locId]) / range) * 100;

      const entitiesAtLoc = cache.readSet("entitiesAtLocation", locId);

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
    // }
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

  // Opaque entities lighting
  const fov = new Set(
    [...inFovEntities.get()].map((x) => cellToId(x.position))
  );

  opaqueNonLightSourceEntities.get().forEach((entity) => {
    let brightestLight = 0;
    let light = null;

    // get all of it's neighbors
    const locIds = getNeighborIds(
      entity.position.x,
      entity.position.y
    ).filter((locId) => fov.has(locId));

    // get brightest light from all neighbors and set light to that
    // if no neighors are lit - stay dark :)
    locIds.forEach((locId) => {
      const entitiesAtLoc = cache.readSet("entitiesAtLocation", locId);
      if (entitiesAtLoc) {
        entitiesAtLoc.forEach((id) => {
          const e = ecs.getEntity(id);
          if (e.light && !e.isOpaque) {
            if (brightestLight < e.light.a) {
              brightestLight = e.light.a;
              light = {
                a: e.light.a,
                sources: e.light.sources,
              };
            }
          }
        });
      }
    });

    if (brightestLight) {
      if (entity.has("Light")) {
        entity.light.a = light.a;
        entity.light.sources = light.sources;
        entity.light.color = light.color;
      } else {
        entity.add(Light, light);
      }
      entity.light.sources.forEach((sourceId) => {
        const { color, weight } = ecs.getEntity(sourceId).lightSource;
        let fg = Color(entity.appearance.color).alpha(light.a / 100);

        const mixedColor = fg.mix(Color(color), weight);
        entity.light.color = mixedColor;
      });
    }
  });
};
