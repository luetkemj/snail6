import ecs, { cache } from "../state/ecs";
import { toCell } from "../lib/grid";
import { drawCell } from "../lib/canvas";

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

export const renderOmniscience = () => {
  console.log(ecs);
  [...ecs.entities.all].forEach((entity) =>
    drawCell(entity, {
      fg: entity.appearance.currentColor || entity.appearance.color,
    })
  );
};
