import "./style.scss";
import "./lib/canvas.js";
import { cache, player } from "./state/ecs";
import { input, processUserInput } from "./lib/process-user-input";
import { cellToId } from "./lib/grid";

import game from "./state/game";

import initDungeonLevel from "./initializers/dungeon-level.init";

import { fov } from "./systems/fov";
import { movement } from "./systems/movement";
import { render } from "./systems/render";

document.addEventListener("keydown", (ev) => input(ev.key));

function initGame() {
  const dungeon = initDungeonLevel();
  player.position.x = dungeon.start.x;
  player.position.y = dungeon.start.y;

  cache.add("entitiesAtLocation", cellToId(dungeon.start), player.id);
}

initGame();

function gameTick() {
  movement();
  fov();
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
