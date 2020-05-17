import "./lib/canvas.js";
import { pxToCell } from "./lib/canvas";
import ecs, { cache, player } from "./state/ecs";
import { input, processUserInput } from "./lib/process-user-input";
import { cellToId } from "./lib/grid";

import game from "./state/game";

import initDungeonLevel from "./initializers/dungeon-level.init";

import { fov } from "./systems/fov";
import { light } from "./systems/light";
import { movement } from "./systems/movement";
import { render } from "./systems/render";

document.addEventListener("keydown", (ev) => input(ev.key));
document.querySelector("#loading").classList.add("hide");

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
  light();
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

// it's a PITA to mock canvas in jest so we just hack it's running
if (process.env.NODE_ENV !== "test") {
  const canvas = document.querySelector("#canvas");

  canvas.onclick = (e) => {
    const [x, y] = pxToCell(e);
    const locId = cellToId({ x, y });

    cache
      .read("entitiesAtLocation", locId)
      .forEach((eId) => console.log(ecs.getEntity(eId).serialize()));
  };
}
