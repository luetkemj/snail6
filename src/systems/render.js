import color from "color";
import ecs from "../state/ecs";
import Appearance from "../components/Appearance";
import IsInFov from "../components/IsInFov";
import IsRevealed from "../components/IsRevealed";
import Position from "../components/Position";
import { clearCanvas, drawCell } from "../lib/canvas";
import Layer100 from "../components/Layer100";
import Layer400 from "../components/Layer400";

const layer100 = ecs.createQuery({
  all: [Appearance, Layer100, Position],
  any: [IsInFov, IsRevealed],
});
const layer400 = ecs.createQuery({
  all: [Appearance, Layer400, Position],
  any: [IsInFov],
});

export const render = () => {
  clearCanvas();

  layer100.get().forEach((entity) => {
    if (!entity.isInFov) {
      drawCell(entity, {
        fg: color(entity.appearance.color)
          .alpha(0.25)
          .saturationl(100)
          .hue(200),
      });
    } else {
      drawCell(entity);
    }
  });

  layer400.get().forEach((entity) => drawCell(entity));
};
