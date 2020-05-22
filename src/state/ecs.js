import { Engine } from "geotic";
import Cache from "./cache";

import Appearance from "../components/Appearance";
import CanDijkstra from "../components/CanDijkstra";
import IsBlocking from "../components/IsBlocking";
import IsInFov from "../components/IsInFov";
import IsOpaque from "../components/IsOpaque";
import IsRevealed from "../components/IsRevealed";
import Layer100 from "../components/Layer100";
import Layer400 from "../components/Layer400";
import MoveTo from "../components/MoveTo";
import Position from "../components/Position";

import BonfirePrefab from "../prefabs/bonfire";
import FloorPrefab from "../prefabs/floor";
import PlayerPrefab from "../prefabs/player";
import WallPrefab from "../prefabs/wall";

const ecs = new Engine();
export const cache = new Cache();

// all Components and Prefabs must be `registered` by the engine
ecs.registerComponent(Appearance);
ecs.registerComponent(CanDijkstra);
ecs.registerComponent(IsBlocking);
ecs.registerComponent(IsInFov);
ecs.registerComponent(IsOpaque);
ecs.registerComponent(IsRevealed);
ecs.registerComponent(Layer100);
ecs.registerComponent(Layer400);
ecs.registerComponent(MoveTo);
ecs.registerComponent(Position);

ecs.registerPrefab(BonfirePrefab);
ecs.registerPrefab(FloorPrefab);
ecs.registerPrefab(PlayerPrefab);
ecs.registerPrefab(WallPrefab);

export let gameState = {
  userInput: null,
  playerTurn: true,
  turn: 0,
};

export let player = ecs.createPrefab("PlayerPrefab");

export function loadGame() {
  const data = JSON.parse(localStorage.getItem("gameSaveData"));
  ecs.deserialize(data.ecs);
  cache.deserialize(data.cache);
  gameState = data.gameState;
  player = ecs.getEntity(data.playerId);

  console.log("game loaded", {
    cache,
    gameState,
    ecs,
    player,
  });
}

export function saveGame() {
  const gameSaveData = {
    ecs: ecs.serialize(),
    cache: cache.serialize(),
    gameState,
    playerId: player.id,
  };
  localStorage.setItem("gameSaveData", JSON.stringify(gameSaveData));

  console.log("game saved");
}

export default ecs;

module.export = {
  cache,
  gameState,
  player,
  loadGame,
  saveGame,
};
