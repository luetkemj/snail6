import { state } from "../../src";

export const input = (key) => {
  switch (key) {
    case "z":
      state.userInput = { key, type: "REST", payload: {} };
      break;
    case "ArrowUp":
      state.userInput = { key, type: "MOVE", payload: { x: 0, y: -1 } };
      break;
    case "ArrowDown":
      state.userInput = { key, type: "MOVE", payload: { x: 0, y: 1 } };
      break;
    case "ArrowLeft":
      state.userInput = { key, type: "MOVE", payload: { x: -1, y: 0 } };
      break;
    case "ArrowRight":
      state.userInput = { key, type: "MOVE", payload: { x: 1, y: 0 } };
      break;
    case "Escape": {
      state.userInput = { key, type: "ESCAPE", payload: {} };
      break;
    }
  }
};

export const processUserInput = () => {
  if (!state.userInput) {
    return;
  }

  const { key, type, payload } = state.userInput;

  console.log({ key, type, payload, raw: state.userInput });
  // const player = getPlayer();

  // if (type === "MOVE") {
  //   player.addComponent("moveTo", payload);
  // }
};
