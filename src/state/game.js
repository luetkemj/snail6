import ecs, { cache } from "./ecs";

let state = {
  userInput: null,
  playerTurn: true,
  turn: 0,
};

export function loadGame() {
  const data = JSON.parse(localStorage.getItem("gameSaveData"));
  ecs.deserialize(data.ecs);
  cache.deserialize(data.cache);
  state = data.state;

  console.log("game loaded", {
    cache,
    state,
    ecs,
  });
}

export function saveGame() {
  const gameSaveData = {
    ecs: ecs.serialize(),
    cache: cache.serialize(),
    state,
  };
  localStorage.setItem("gameSaveData", JSON.stringify(gameSaveData));

  console.log("game saved");
}

export default state;
