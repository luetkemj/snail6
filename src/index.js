import "./style.scss";
import "./lib/canvas.js";
import { input, processUserInput } from "./lib/process-user-input";

export const state = {
  userInput: null,
  playerTurn: false,
  turn: 0,
};

document.addEventListener("keydown", (ev) => input(ev.key));

function gameTick() {
  // this is where the systems will run
  // console.log("tick");
}

gameTick();

function update() {
  if (state.userInput && state.playerTurn) {
    processUserInput();
    gameTick();
    state.userInput = null;
    state.turn = state.turn += 1;
    state.playerTurn = false;
    console.log(state.turn);
  }

  if (!state.playerTurn) {
    gameTick();
    state.playerTurn = true;
  }
}

function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
