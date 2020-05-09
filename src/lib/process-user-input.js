import game from "../state/game";

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

  console.log({ key, type, payload, raw: game.userInput });
  // const player = getPlayer();

  // if (type === "MOVE") {
  //   player.addComponent("moveTo", payload);
  // }
};
