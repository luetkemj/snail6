import ecs from "../state/ecs";
import Appearance from "../components/Appearance";
import Position from "../components/Position";
import { clearCanvas, drawCell } from "../lib/canvas";

export const render = () => {
  clearCanvas();
  // render map
  const entities = ecs.createQuery({
    all: [Appearance, Position],
  });

  entities.get().forEach((entity) => {
    drawCell(entity);
  });
};
