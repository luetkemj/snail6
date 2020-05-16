import "./style.scss";
import "./lib/canvas.js";
import { input, processUserInput } from "./lib/process-user-input";

import game from "./state/game";

import initDungeonLevel from "./initializers/dungeon-level.init";

import { movement } from "./systems/movement";
import { render } from "./systems/render";

document.addEventListener("keydown", (ev) => input(ev.key));

function initGame() {
  const dungeon = initDungeonLevel();
}

initGame();

function gameTick() {
  movement();
  render();
}

gameTick();

function update() {
  if (game.userInput && game.playerTurn) {
    processUserInput();
    gameTick();
    game.userInput = null;
    game.turn = game.turn += 1;
    game.playerTurn = false;
  }

  if (!game.playerTurn) {
    gameTick();
    game.playerTurn = true;
  }
}

function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
