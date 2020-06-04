import { gameState } from "../state/ecs";
import Terminal from "../gui/Terminal";
import { colors } from "../lib/graphics";
import { clearCanvas, drawCell } from "../lib/canvas";
import {
  layer100Entities,
  layer300Entities,
  layer400Entities,
} from "../queries";

import { renderOmniscience } from "../lib/debug";

const drawCellIfAble = (entity) => {
  const { appearance, isInFov, isRevealed } = entity;

  if (isInFov) {
    drawCell(entity, { fg: appearance.currentColor || appearance.color });
  }

  if (isRevealed && !isInFov) {
    drawCell(entity, {
      fg: colors.revealedColor,
    });
  }
};

const AdventureLog = new Terminal({
  width: 75,
  height: 3,
  x: 21,
  y: 0,
  color: "#FFF",
  background: "transparent",
  text: { text: "COVERED IN BLOOD!", fg: "red" },
  // text: "COVERED IN BLOOD!",
  type: "TEXT",
});

export const render = () => {
  clearCanvas();

  layer100Entities.get().forEach((entity) => drawCellIfAble(entity));

  // renderOmniscience();

  layer300Entities.get().forEach((entity) => drawCellIfAble(entity));
  layer400Entities.get().forEach((entity) => drawCellIfAble(entity));

  AdventureLog.draw();
};
