import { Engine } from "geotic";

import Appearance from "../components/Appearance";
import IsBlocking from "../components/IsBlocking";
import IsOpaque from "../components/IsOpaque";
import Layer100 from "../components/Layer100";
import Layer400 from "../components/Layer400";
import MoveTo from "../components/MoveTo";
import Position from "../components/Position";

import CreaturePrefab from "../prefabs/creature";
import PlayerPrefab from "../prefabs/player";

import TilePrefab from "../prefabs/tile";
import CavernFloorPrefab from "../prefabs/cavern-floor";
import FloorPrefab from "../prefabs/floor";
import WallPrefab from "../prefabs/wall";

const ecs = new Engine();

// all Components and Prefabs must be `registered` by the engine
ecs.registerComponent(Appearance);
ecs.registerComponent(IsBlocking);
ecs.registerComponent(IsOpaque);
ecs.registerComponent(Layer100);
ecs.registerComponent(Layer400);
ecs.registerComponent(MoveTo);
ecs.registerComponent(Position);

ecs.registerPrefab(CreaturePrefab);
ecs.registerPrefab(PlayerPrefab);

ecs.registerPrefab(TilePrefab);
ecs.registerPrefab(CavernFloorPrefab);
ecs.registerPrefab(FloorPrefab);
ecs.registerPrefab(WallPrefab);

export const player = ecs.createPrefab("PlayerPrefab");

console.log("playret", player);

console.log(ecs.serialize());

export default ecs;
