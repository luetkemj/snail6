import ecs from "../state/ecs";
import Appearance from "../components/Appearance";
import Position from "../components/Position";
import { clearCanvas, drawCell } from "../lib/canvas";
import Layer100 from "../components/Layer100";
import Layer400 from "../components/Layer400";

const entities = ecs.createQuery({
  all: [Appearance, Position],
});

const layer100 = ecs.createQuery({
  all: [Appearance, Layer100, Position],
});
const layer400 = ecs.createQuery({
  all: [Appearance, Layer400, Position],
});

export const render = () => {
  clearCanvas();

  layer100.get().forEach((entity) => drawCell(entity));
  layer400.get().forEach((entity) => drawCell(entity));
};
