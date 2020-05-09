import game from "../state/game";
import { MoveTo, player } from "../state/ecs";

export const input = (key) => {
  switch (key) {
    case "z":
      game.userInput = { key, type: "REST", payload: {} };
      break;
    case "ArrowUp":
      game.userInput = { key, type: "MOVE", payload: { x: 0, y: -1 } };
      break;
    case "ArrowDown":
      game.userInput = { key, type: "MOVE", payload: { x: 0, y: 1 } };
      break;
    case "ArrowLeft":
      game.userInput = { key, type: "MOVE", payload: { x: -1, y: 0 } };
      break;
    case "ArrowRight":
      game.userInput = { key, type: "MOVE", payload: { x: 1, y: 0 } };
      break;
    case "Escape": {
      game.userInput = { key, type: "ESCAPE", payload: {} };
      break;
    }
  }
};

export const processUserInput = () => {
  if (!game.userInput) {
    return;
  }

  const { key, type, payload } = game.userInput;

  if (type === "MOVE") {
    player.add(MoveTo, payload);
  }
};
