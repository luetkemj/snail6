import MoveTo from "../components/MoveTo";
import { gameState, player, loadGame, saveGame } from "../state/ecs";

export const input = (key) => {
  switch (key) {
    case "S":
      return { key, type: "SAVE", payload: {} };
    case "L":
      return { key, type: "LOAD", payload: {} };
    case "z":
      return { key, type: "REST", payload: {} };
    case "ArrowUp":
      return { key, type: "MOVE", payload: { x: 0, y: -1 } };
    case "ArrowDown":
      return { key, type: "MOVE", payload: { x: 0, y: 1 } };
    case "ArrowLeft":
      return { key, type: "MOVE", payload: { x: -1, y: 0 } };
    case "ArrowRight":
      return { key, type: "MOVE", payload: { x: 1, y: 0 } };
    case "Escape": {
      return { key, type: "ESCAPE", payload: {} };
    }
  }
};

export const processUserInput = (input) => {
  if (!input) {
    return;
  }

  const { key, type, payload } = input;

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
