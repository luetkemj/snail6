import { Engine, Component } from "geotic";

import { chars, colors } from "../lib/graphics";
import { layers } from "../lib/canvas";

const ecs = new Engine();

// some components
// todo: move these to own files somewhere
export class Appearance extends Component {
  static properties = {
    color: colors.defaultColor,
    char: "?",
    background: "transparent",
    layer: layers.ground,
  };
}

export class MoveTo extends Component {
  static properties = { x: 0, y: 0 };
}

export class Position extends Component {
  static properties = { x: 0, y: 0 };
}

// all Components and Prefabs must be `registered` by the engine
ecs.registerComponent(Appearance);
ecs.registerComponent(MoveTo);
ecs.registerComponent(Position);

export const player = ecs.createEntity();
player.add(Position);
player.add(Appearance, { char: chars.player, color: colors.player });

export default ecs;
