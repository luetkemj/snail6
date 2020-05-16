import ecs from "../state/ecs";
import { grid } from "../lib/canvas";
import MoveTo from "../components/MoveTo";
import Position from "../components/Position";
import IsBlocking from "../components/IsBlocking";

const entities = ecs.createQuery({
  all: [MoveTo, Position],
});

const blockingEntities = ecs.createQuery({
  all: [IsBlocking, Position],
});

export const movement = () => {
  entities.get().forEach((entity) => {
    const mPos = {
      x: entity.position.x + entity.moveTo.x,
      y: entity.position.y + entity.moveTo.y,
    };

    const { width, height, x, y } = grid.map;

    // observe map boundaries
    const mx = Math.min(width + x - 1, Math.max(x, mPos.x));
    const my = Math.min(height + y - 1, Math.max(y, mPos.y));

    let hasBlockers = false;

    blockingEntities.get().forEach((e) => {
      if (e.position.x === mx && e.position.y === my && e.isBlocking) {
        hasBlockers = true;
      }
    });

    if (hasBlockers) {
      return entity.remove(MoveTo);
    }

    entity.position.x = mx;
    entity.position.y = my;

    entity.remove(MoveTo);
  });
};
