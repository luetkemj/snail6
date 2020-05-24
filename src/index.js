import "./lib/canvas.js";
import { pxToCell } from "./lib/canvas";
import { gameState } from "./state/ecs";
import { input } from "./lib/process-user-input";
import { cellToId } from "./lib/grid";
import { render } from "./systems/render";
import Worker from "./workers/tick.worker.js";

const worker = new Worker();
let workerIsBusy = false;
let userInput = false;
document.addEventListener("keydown", (ev) => {
  if (!workerIsBusy && !userInput) {
    userInput = input(ev.key);
  } else {
    userInput = false;
  }
  console.log(userInput);
});
document.querySelector("#loading").classList.add("hide");

function initGame() {
  worker.postMessage({
    action: "INIT_DUNGEON_LEVEL",
  });
}

initGame();

worker.onmessage = function (event) {
  if (event) {
    render(event);
  }
  workerIsBusy = false;
};

function gameTick() {
  workerIsBusy = true;
  worker.postMessage({
    action: "TICK",
    payload: { userInput, playerTurn: gameState.playerTurn },
  });

  userInput = false;
}

gameTick();

function update() {
  if (!workerIsBusy) {
    if (userInput && gameState.playerTurn) {
      // processUserInput();
      gameTick();
      gameState.turn = gameState.turn += 1;
      gameState.playerTurn = false;
    }

    if (!gameState.playerTurn) {
      gameTick();
      gameState.playerTurn = true;
    }
  }
}

function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// need to message worker for this data!
// it's a PITA to mock canvas in jest so we just hack it's running
// if (process.env.NODE_ENV !== "test") {
//   const canvas = document.querySelector("#canvas");

//   canvas.onclick = (e) => {
//     const [x, y] = pxToCell(e);
//     const locId = cellToId({ x, y });

//     cache
//       .readSet("entitiesAtLocation", locId)
//       .forEach((eId) => console.log(ecs.getEntity(eId).serialize()));
//   };
// }
