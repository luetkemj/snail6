import "./style.scss";
import "./lib/canvas.js";

import { Engine, Component, Prefab } from "geotic";

document.addEventListener("keydown", (ev) => console.log(ev.key));

const ecs = new Engine();

// define some simple components
class Position extends Component {
  static properties = { x: 0, y: 0 };
}
class Velocity extends Component {
  static properties = { x: 0, y: 0 };
}
class Frozen extends Component {}

// all Components and Prefabs must be `registered` by the engine
ecs.registerComponent(Position);
ecs.registerComponent(Velocity);
ecs.registerComponent(Frozen);

// Create an empty entity. Call `entity.id` to get the unique ID.
const entity = ecs.createEntity();

// add Position and Velocity components to this entity
entity.add(Position, { x: 4, y: 10 });
entity.add(Velocity, { x: 1, y: 0.25 });

// create a query that tracks all components that have both a `Position`
// and `Velocity` component but not a `Frozen` component. A query can
// have any combination of `all`, `none` and `any`
const kinematics = ecs.createQuery({
  all: [Position, Velocity],
  none: [Frozen],
});

const data = ecs.serialize(); // serialize the game state into a javascript object

console.log(data);

// ecs.deserialize(data); // convert the serialized data back into entities and components
