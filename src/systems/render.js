import { random, sortBy, times, zip } from "lodash";
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

const drawCellIfAble = (entity, options) => {
  const { appearance, isInFov, isRevealed } = entity;

  if (isInFov) {
    drawCell(entity, {
      fg: appearance.currentColor || appearance.color,
      ...options,
    });
  }

  if (isRevealed && !isInFov) {
    drawCell(entity, {
      fg: colors.revealedColor,
      ...options,
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

const bloodTemplates = () => {
  const bloodLines = [];
  times(79, () => {
    const line = [];
    times(random(0, 34), () => {
      line.push("•");
    });
    bloodLines.push(line);
  });

  return zip(...bloodLines)
    .map((line) => line.map((x) => x || " "))
    .map((x) => ({
      text: x.join(""),
      fg: colors.blood,
    }));
};

const MorgueBlood = new Terminal({
  width: 79,
  height: 30,
  x: 21,
  y: 3,
  templates: bloodTemplates(),
});

const Morgue = new Terminal({
  width: 35,
  height: 8,
  x: 35,
  y: 10,
  templates: [
    {
      text: "You Have Died",
      fg: colors.blood,
      x: 53,
    },
    { text: "Refresh the browser", x: 50 },
    { text: "to play again", x: 53 },
  ],
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

  const options = {};
  if (player.isDead) {
    options.fgA = 0;
  }

  layer100Entities.get().forEach((entity) => drawCellIfAble(entity, options));

  // renderOmniscience();

  layer300Entities.get().forEach((entity) => drawCellIfAble(entity, options));
  layer400Entities.get().forEach((entity) => drawCellIfAble(entity, options));

  AdventureLog.draw();
  InnerMonologue.draw();
  Legend.drawNamePlates(sortLegend());

  if (player.isDead) {
    MorgueBlood.draw();
    Morgue.draw();
  }

  // to view all possible characters
  // clearCanvas();
  // renderAllChars();
};
