import { Engine, Component } from "geotic";

import { chars, colors } from "../lib/graphics";
import { layers } from "../lib/canvas";

const ecs = new Engine();

// some player components
export class Position extends Component {
  static properties = { x: 0, y: 0 };
}

export class Appearance extends Component {
  static properties = {
    color: colors.defaultColor,
    char: "?",
    background: "transparent",
    layer: layers.ground,
  };
}

// all Components and Prefabs must be `registered` by the engine
ecs.registerComponent(Position);
ecs.registerComponent(Appearance);

const player = ecs.createEntity();
player.add(Position);
player.add(Appearance, { char: chars.player, color: colors.player });

export default ecs;
