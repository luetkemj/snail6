import { Engine } from "geotic";

import Appearance from "../components/Appearance";
import MoveTo from "../components/MoveTo";
import Position from "../components/Position";

import CreaturePrefab from "../prefabs/creature";
import PlayerPrefab from "../prefabs/player";

const ecs = new Engine();

// all Components and Prefabs must be `registered` by the engine
ecs.registerComponent(Appearance);
ecs.registerComponent(MoveTo);
ecs.registerComponent(Position);

ecs.registerPrefab(CreaturePrefab);
ecs.registerPrefab(PlayerPrefab);

export const player = ecs.createPrefab("PlayerPrefab");

console.log(ecs.serialize());

export default ecs;
