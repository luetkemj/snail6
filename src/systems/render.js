import ecs, { Appearance, Position } from "../state/ecs";
import { clearCanvas, drawCell } from "../lib/canvas";

export const render = () => {
  clearCanvas();
  // render map
  const entities = ecs.createQuery(ecs, {
    all: [Appearance],
  });

  entities.get().forEach((entity) => {
    drawCell(entity);
  });
};
