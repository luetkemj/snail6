import { Engine } from "geotic";
import Cache from "./cache";

import Appearance from "../components/Appearance";
import CanDijkstra from "../components/CanDijkstra";
import HasMoved from "../components/HasMoved";
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

import BonfirePrefab from "../prefabs/bonfire";
import FloorPrefab from "../prefabs/floor";
import PlayerPrefab from "../prefabs/player";
import WallPrefab from "../prefabs/wall";

const ecs = new Engine();
export const cache = new Cache();

// all Components and Prefabs must be `registered` by the engine
ecs.registerComponent(Appearance);
ecs.registerComponent(CanDijkstra);
ecs.registerComponent(HasMoved);
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

ecs.registerPrefab(BonfirePrefab);
ecs.registerPrefab(FloorPrefab);
ecs.registerPrefab(PlayerPrefab);
ecs.registerPrefab(WallPrefab);

export const player = ecs.createPrefab("PlayerPrefab");

export default ecs;
