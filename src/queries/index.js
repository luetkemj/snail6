import ecs from "../state/ecs";

import Animate from "../components/Animate";
import Appearance from "../components/Appearance";
import AreaOfEffect from "../components/AreaOfEffect";
import Brain from "../components/Brain";
import CanAbsorb from "../components/CanAbsorb";
import CanBeAbsorbed from "../components/CanBeAbsorbed";
import CanDijkstra from "../components/CanDijkstra";
import CanLegend from "../components/CanLegend";
import IsBlocking from "../components/IsBlocking";
import IsInFov from "../components/IsInFov";
import IsOpaque from "../components/IsOpaque";
import IsRevealed from "../components/IsRevealed";
import Layer100 from "../components/Layer100";
import Layer300 from "../components/Layer300";
import Layer400 from "../components/Layer400";
import MoveTo from "../components/MoveTo";
import Position from "../components/Position";
import Soilage from "../components/Soilage";

export const aiEntities = ecs.createQuery({
  all: [Brain],
});

export const aiEntitiesInFov = ecs.createQuery({
  all: [Brain, IsInFov],
});

export const animatingEntities = ecs.createQuery({
  all: [Animate, IsInFov],
});

export const aoeEntities = ecs.createQuery({
  all: [AreaOfEffect],
});

export const blockingEntities = ecs.createQuery({
  all: [IsBlocking, Position],
});

export const dijkstraAbleEntities = ecs.createQuery({
  all: [CanDijkstra],
});

export const inFovEntities = ecs.createQuery({
  all: [IsInFov],
});

export const layer100Entities = ecs.createQuery({
  all: [Appearance, Layer100, Position],
  any: [IsInFov, IsRevealed],
});

export const layer300Entities = ecs.createQuery({
  all: [Appearance, Layer300, Position],
  any: [IsInFov, IsRevealed],
});

export const layer400Entities = ecs.createQuery({
  all: [Appearance, Layer400, Position],
  any: [IsInFov],
});

export const legendEntities = ecs.createQuery({
  all: [CanLegend, IsInFov],
});

export const movableEntities = ecs.createQuery({
  all: [MoveTo, Position],
});

export const opaqueEntities = ecs.createQuery({
  all: [IsOpaque],
});

export const renderableEntities = ecs.createQuery({
  all: [Position, Appearance],
});

export const soiledEntities = ecs.createQuery({
  all: [Soilage, CanBeAbsorbed],
  none: [CanAbsorb],
});
