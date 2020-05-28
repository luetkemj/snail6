import MoveTo from "../components/MoveTo";
import { gameState, player, loadGame, saveGame } from "../state/ecs";

export const input = (key) => {
  switch (key) {
    case "L":
      gameState.userInput = { key, type: "LOAD", payload: {} };
      break;
    case "S":
      gameState.userInput = { key, type: "SAVE", payload: {} };
      break;
    case "c":
      gameState.userInput = { key, type: "CLEAN", payload: {} };
      break;
    case "z":
      gameState.userInput = { key, type: "REST", payload: {} };
      break;
    case "ArrowUp":
      gameState.userInput = { key, type: "MOVE", payload: { x: 0, y: -1 } };
      break;
    case "ArrowDown":
      gameState.userInput = { key, type: "MOVE", payload: { x: 0, y: 1 } };
      break;
    case "ArrowLeft":
      gameState.userInput = { key, type: "MOVE", payload: { x: -1, y: 0 } };
      break;
    case "ArrowRight":
      gameState.userInput = { key, type: "MOVE", payload: { x: 1, y: 0 } };
      break;
    case "Escape": {
      gameState.userInput = { key, type: "ESCAPE", payload: {} };
      break;
    }
  }
};

export const processUserInput = () => {
  if (!gameState.userInput) {
    return;
  }

  const { key, type, payload } = gameState.userInput;

  if (type === "CLEAN") {
    player.fireEvent("clean");
  }

  if (type === "MOVE") {
    player.add(MoveTo, payload);
  }

  if (type === "SAVE") {
    saveGame();
  }

  if (type === "LOAD") {
    loadGame();
  }
};
