import { colors } from "../lib/graphics";
import { clearCanvas, drawCell } from "../lib/canvas";
import {
  layer100Entities,
  layer300Entities,
  layer400Entities,
} from "../queries";

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

export const render = () => {
  clearCanvas();

  layer100Entities.get().forEach((entity) => drawCellIfAble(entity));
  layer300Entities.get().forEach((entity) => drawCellIfAble(entity));
  layer400Entities.get().forEach((entity) => drawCellIfAble(entity));
};
