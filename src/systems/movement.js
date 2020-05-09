import ecs, { MoveTo, Position } from "../state/ecs";

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
