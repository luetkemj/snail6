import Color from "color";
import { clearCanvas, drawCell } from "../lib/canvas";
import { layer100Entities, layer400Entities } from "../queries";

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
        fg: Color(appearance.color).alpha(0.1).saturationl(100).hue(200),
      });
    }
  }
};

export const render = () => {
  clearCanvas();
  layer100Entities.get().forEach((entity) => drawCellIfAble(entity));
  layer400Entities.get().forEach((entity) => drawCellIfAble(entity));
};
