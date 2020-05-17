import Color from "color";
import ecs from "../state/ecs";
import Appearance from "../components/Appearance";
import IsInFov from "../components/IsInFov";
import IsRevealed from "../components/IsRevealed";
import Light from "../components/Light";
import Position from "../components/Position";
import { clearCanvas, drawCell } from "../lib/canvas";
import Layer100 from "../components/Layer100";
import Layer400 from "../components/Layer400";

// light?

const layer100 = ecs.createQuery({
  all: [Appearance, Layer100, Position],
  any: [IsInFov, IsRevealed, Light],
});

const layer400 = ecs.createQuery({
  all: [Appearance, Layer400, Position],
  any: [IsInFov],
});

const drawCellIfAble = (entity) => {
  const { appearance, isInFov, light } = entity;

  if (isInFov && light) {
    if (light.color && light.a > 0) {
      drawCell(entity, { fg: light.color });
    }
  }

  if (entity.has("IsRevealed")) {
    if (!isInFov || (isInFov && !light) || (isInFov && light <= 0)) {
      drawCell(entity, {
        fg: Color(appearance.color).alpha(0.15).saturationl(100).hue(200),
      });
    }
  }
};

export const render = () => {
  clearCanvas();
  layer100.get().forEach((entity) => drawCellIfAble(entity));
  layer400.get().forEach((entity) => drawCellIfAble(entity));
};
