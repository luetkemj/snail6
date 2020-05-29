import { Engine } from "geotic";
import Cache from "./cache";

import Animate from "../components/Animate";
import Appearance from "../components/Appearance";
import Brain from "../components/Brain";
import CanDijkstra from "../components/CanDijkstra";
import Health from "../components/Health";
import IsBlocking from "../components/IsBlocking";
import IsDead from "../components/IsDead";
import IsInFov from "../components/IsInFov";
import IsOpaque from "../components/IsOpaque";
import IsRevealed from "../components/IsRevealed";
import Layer100 from "../components/Layer100";
import Layer300 from "../components/Layer300";
import Layer400 from "../components/Layer400";
import MoveTo from "../components/MoveTo";
import Name from '../components/Name';
import Position from "../components/Position";
import Soilage from '../components/Soilage';

import BonfirePrefab from "../prefabs/bonfire";
import FloorPrefab from "../prefabs/floor";
import FountainPrefab from "../prefabs/fountain";
import GoblinPrefab from "../prefabs/goblin";
import PlayerPrefab from "../prefabs/player";
import WallPrefab from "../prefabs/wall";

const ecs = new Engine();
export const cache = new Cache();

// all Components and Prefabs must be `registered` by the engine
ecs.registerComponent(Animate);
ecs.registerComponent(Appearance);
ecs.registerComponent(Brain);
ecs.registerComponent(CanDijkstra);
ecs.registerComponent(Health);
ecs.registerComponent(IsBlocking);
ecs.registerComponent(IsDead);
ecs.registerComponent(IsInFov);
ecs.registerComponent(IsOpaque);
ecs.registerComponent(IsRevealed);
ecs.registerComponent(Layer100);
ecs.registerComponent(Layer300);
ecs.registerComponent(Layer400);
ecs.registerComponent(MoveTo);
ecs.registerComponent(Name);
ecs.registerComponent(Position);
ecs.registerComponent(Soilage)

ecs.registerPrefab(BonfirePrefab);
ecs.registerPrefab(FloorPrefab);
ecs.registerPrefab(FountainPrefab);
ecs.registerPrefab(GoblinPrefab);
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
  if (!data) {
    console.log("No Saved Games Found");
    return;
  }

  for (let item of ecs.entities.all) {
    item.destroy();
  }

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
