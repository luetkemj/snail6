import ecs from "../state/ecs";
import MoveTo from "../components/MoveTo";
import Position from "../components/Position";

export const movement = () => {
  const entities = ecs.createQuery({
    all: [MoveTo, Position],
  });

  entities.get().forEach((entity) => {
    const mPos = {
      x: entity.position.x + entity.moveTo.x,
      y: entity.position.y + entity.moveTo.y,
    };

    entity.position.x = mPos.x;
    entity.position.y = mPos.y;

    entity.remove(MoveTo);
  });
};
