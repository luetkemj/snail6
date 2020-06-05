import { gameState, player } from "../state/ecs";
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
  templates: gameState.adventureLog,
  fadeY: true,
});

const NamePlate = new Terminal({
  width: 20,
  height: 1,
  x: 0,
  y: 0,
});

export const render = () => {
  clearCanvas();

  NamePlate.update([
    [
      {
        text: player.appearance.char,
        fg: player.appearance.currentColor || player.appearance.color,
      },
      { text: " You" },
    ],
  ]);

  layer100Entities.get().forEach((entity) => drawCellIfAble(entity));
  // renderOmniscience();
  layer300Entities.get().forEach((entity) => drawCellIfAble(entity));
  layer400Entities.get().forEach((entity) => drawCellIfAble(entity));

  AdventureLog.draw();
  NamePlate.draw();
};
