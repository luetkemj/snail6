import { Engine } from "geotic";
import Cache from "./cache";

import Animate from "../components/Animate";
import Appearance from "../components/Appearance";
import Blood from "../components/Blood";
import Brain from "../components/Brain";
import CanAbsorb from "../components/CanAbsorb";
import CanDijkstra from "../components/CanDijkstra";
import CanLegend from "../components/CanLegend";
import Description from "../components/Description";
import Health from "../components/Health";
import IsBlocking from "../components/IsBlocking";
import isBoneless from "../components/isBoneless";
import IsDead from "../components/IsDead";
import IsInFov from "../components/IsInFov";
import IsOpaque from "../components/IsOpaque";
import IsRevealed from "../components/IsRevealed";
import Layer100 from "../components/Layer100";
import Layer300 from "../components/Layer300";
import Layer400 from "../components/Layer400";
import MoveTo from "../components/MoveTo";
import Name from "../components/Name";
import Position from "../components/Position";
import Soilage from "../components/Soilage";

import BonfirePrefab from "../prefabs/bonfire";
import CharPrefab from "../prefabs/char";
import FloorPrefab from "../prefabs/floor";
import FountainPrefab from "../prefabs/fountain";
import GelatinousCubePrefab from "../prefabs/gelatinous-cube";
import GoblinPrefab from "../prefabs/goblin";
import PlayerPrefab from "../prefabs/player";
import SkeletonPrefab from "../prefabs/skeleton";
import WallPrefab from "../prefabs/wall";

const ecs = new Engine();
export const cache = new Cache();

// all Components and Prefabs must be `registered` by the engine
ecs.registerComponent(Animate);
ecs.registerComponent(Appearance);
ecs.registerComponent(Blood);
ecs.registerComponent(Brain);
ecs.registerComponent(CanAbsorb);
ecs.registerComponent(CanDijkstra);
ecs.registerComponent(CanLegend);
ecs.registerComponent(Description);
ecs.registerComponent(Health);
ecs.registerComponent(isBoneless);
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
ecs.registerComponent(Soilage);

ecs.registerPrefab(BonfirePrefab);
ecs.registerPrefab(CharPrefab);
ecs.registerPrefab(FloorPrefab);
ecs.registerPrefab(FountainPrefab);
ecs.registerPrefab(GelatinousCubePrefab);
ecs.registerPrefab(GoblinPrefab);
ecs.registerPrefab(PlayerPrefab);
ecs.registerPrefab(SkeletonPrefab);
ecs.registerPrefab(WallPrefab);

export let gameState = {
  userInput: null,
  playerTurn: true,
  turn: 0,
  adventureLog: [],
  innerMonologue: [{ text: "I think, therefore I am." }],
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

window.snail = {
  ecs,
  cache,
  gameState,
  player,
};

export default ecs;

module.export = {
  cache,
  gameState,
  player,
  loadGame,
  saveGame,
};
