import { sortBy } from "lodash";
import { cache, gameState, player } from "../state/ecs";
import Terminal from "../gui/Terminal";
import { colors } from "../lib/graphics";
import { clearCanvas, drawCell } from "../lib/canvas";
import { toLocId } from "../lib/grid";
import {
  layer100Entities,
  layer300Entities,
  layer400Entities,
  legendEntities,
} from "../queries";

import { renderOmniscience, renderAllChars } from "../lib/debug";

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

const InnerMonologue = new Terminal({
  width: 75,
  height: 1,
  x: 21,
  y: 33,
  templates: gameState.innerMonologue,
});

const Legend = new Terminal({
  width: 20,
  height: 30,
  x: 0,
  y: 0,
});

const sortLegend = () => {
  const playerDijkstra = cache.readObj("dijkstraMaps", "player");

  return sortBy([...legendEntities.get()], (entity) => {
    const dScore = playerDijkstra[toLocId(entity.position)];
    return dScore;
  });
};

export const render = () => {
  clearCanvas();

  layer100Entities.get().forEach((entity) => drawCellIfAble(entity));
  // renderOmniscience();
  layer300Entities.get().forEach((entity) => drawCellIfAble(entity));
  layer400Entities.get().forEach((entity) => drawCellIfAble(entity));

  AdventureLog.draw();
  InnerMonologue.draw();
  Legend.drawNamePlates(sortLegend());

  // clearCanvas();
  // renderAllChars();
};
