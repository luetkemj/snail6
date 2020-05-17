import { Engine } from "geotic";
import Cache from "./cache";

import Appearance from "../components/Appearance";
import IsBlocking from "../components/IsBlocking";
import IsInFov from "../components/IsInFov";
import IsOpaque from "../components/IsOpaque";
import IsRevealed from "../components/IsRevealed";
import Layer100 from "../components/Layer100";
import Layer400 from "../components/Layer400";
import Light from "../components/Light";
import LightSource from "../components/LightSource";
import MoveTo from "../components/MoveTo";
import Position from "../components/Position";

import CreaturePrefab from "../prefabs/creature";
import PlayerPrefab from "../prefabs/player";

import TilePrefab from "../prefabs/tile";
import CavernFloorPrefab from "../prefabs/cavern-floor";
import FloorPrefab from "../prefabs/floor";
import WallPrefab from "../prefabs/wall";

const ecs = new Engine();
export const cache = new Cache();

// all Components and Prefabs must be `registered` by the engine
ecs.registerComponent(Appearance);
ecs.registerComponent(IsBlocking);
ecs.registerComponent(IsInFov);
ecs.registerComponent(IsOpaque);
ecs.registerComponent(IsRevealed);
ecs.registerComponent(Layer100);
ecs.registerComponent(Layer400);
ecs.registerComponent(Light);
ecs.registerComponent(LightSource);
ecs.registerComponent(MoveTo);
ecs.registerComponent(Position);

ecs.registerPrefab(CreaturePrefab);
ecs.registerPrefab(PlayerPrefab);

ecs.registerPrefab(TilePrefab);
ecs.registerPrefab(CavernFloorPrefab);
ecs.registerPrefab(FloorPrefab);
ecs.registerPrefab(WallPrefab);

export const player = ecs.createPrefab("PlayerPrefab");

export default ecs;
