import ecs from "../state/ecs";
import Appearance from "../components/Appearance";
import Position from "../components/Position";
import { clearCanvas, drawCell } from "../lib/canvas";

const entities = ecs.createQuery({
  all: [Appearance, Position],
});

export const render = () => {
  clearCanvas();
  // render map
  entities.get().forEach((entity) => {
    drawCell(entity);
  });
};
