import { sample } from "lodash";
import ecs, { cache } from "../state/ecs";
import { drawCell } from "../lib/canvas";
import { rectangle, toCell } from "../lib/grid";
import allChars from "./all-chars";

const colorNames = [
  "CRIMSON",
  "PALEVIOLETRED",
  "TOMATO",
  "ORANGERED",
  "DARKORANGE",
  "KHAKI",
  "DARKSLATEBLUE",
  "VIOLET",
  "DARKCYAN",
  "SEAGREEN",
  "STEELBLUE",
  "MEDIUMSLATEBLUE",
];

// render dijkstra
export const renderDijkstra = (dMapName) => {
  Object.keys(cache.dijkstraMaps[dMapName]).forEach((locId) => {
    drawCell(
      {
        appearance: {
          char: cache.dijkstraMaps.player[locId],
          background: "transparent",
        },
        position: toCell(locId),
      },
      { fgA: 0.5, size: 16 }
    );
  });
};

export const renderOmniscience = (alpha) => {
  [...ecs.entities.all].forEach((entity) =>
    drawCell(entity, {
      fg: entity.appearance.currentColor || entity.appearance.color,
      fgA: alpha || 1,
    })
  );
};

export const renderAllChars = (rotate) => {
  const charEntities = [];

  if (!cache.allChars.length) {
    const cells = rectangle({ x: 0, y: 0, width: 100, height: 30 });
    Object.keys(cells.tiles).forEach((tileId, index) => {
      if (allChars[index]) {
        const currTile = cells.tiles[tileId];
        const entity = ecs.createPrefab("CharPrefab", {
          position: { x: currTile.x, y: currTile.y },
          appearance: {
            char: allChars[index],
            // color: index % 2 ? "red" : "yellow",
            color: sample(colorNames),
          },
        });
        charEntities.push(entity);
        cache.addSet("entitiesAtLocation", tileId, entity.id);
      }
    });

    cache.allChars = charEntities;
  }

  cache.allChars.forEach((entity) => {
    drawCell(entity, { rotate });
  });
};
