import { colors } from "../lib/graphics";
import { clearCanvas, drawCell } from "../lib/canvas";

const drawCellIfAble = (entity) => {
  const { appearance, isInFov, isRevealed } = entity;

  if (isInFov) {
    drawCell(entity, { fg: appearance.color });
  }

  if (isRevealed && !isInFov) {
    drawCell(entity, {
      fg: colors.revealedColor,
    });
  }
};

export const render = (event) => {
  clearCanvas();
  const { layer100, layer400 } = event.data.payload;
  layer100.forEach((entity) => drawCellIfAble(entity));
  layer400.forEach((entity) => drawCellIfAble(entity));
};
