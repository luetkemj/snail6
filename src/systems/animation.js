import ecs from "../state/ecs";

import { clearCell, drawCell } from "../lib/canvas";
import { animatingEntities } from "../queries";

export const animation = () => {
  animatingEntities.get().forEach((entity) => {
    const time = new Date();
    // set animation startTime
    if (!entity.animate.startTime) {
      entity.fireEvent("set-start-time", { time });
    }
    const frameTime = time - entity.animate.startTime;
    // end animation when complete
    if (frameTime > entity.animate.duration) {
      return entity.remove("Animate");
    }
    const framePercent = frameTime / entity.animate.duration;
    // do the animation
    // clear the cell first
    clearCell(entity.position.x, entity.position.y);
    if (entity.animate.animation.type === "color") {
      // drawEndFrame
      drawCell(entity, {
        fg: entity.animate.animation.stops[0],
      });
      // drawStartFrame
      drawCell(entity, {
        fg: entity.animate.animation.stops[1],
        fgA: framePercent,
        bg: "transparent",
      });
    }
  });
};
