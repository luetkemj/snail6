import ecs from "../state/ecs";

import { clearCell, drawCell } from "../lib/canvas";
import { animatingEntities } from "../queries";

export const animation = () => {
  animatingEntities.get().forEach((entity) => {
    const time = new Date();

    entity.animate.forEach((animationX) => {
      // set animation startTime
      if (!animationX.startTime) {
        entity.fireEvent("set-start-time", { time });
      }

      const frameTime = time - animationX.startTime;

      // end animation when complete
      if (frameTime > animationX.duration) {
        return animationX.destroy();
      }

      const framePercent = frameTime / animationX.duration;

      // do the animation
      // clear the cell first
      clearCell(entity.position.x, entity.position.y);

      // COLOR
      if (animationX.animation.type === "color") {
        // drawEndFrame
        drawCell(entity, {
          fg: animationX.animation.stops[0],
        });
        // drawStartFrame
        drawCell(entity, {
          fg: animationX.animation.stops[1],
          fgA: framePercent,
          bg: "transparent",
        });
      }

      // SHAKE
      if (animationX.animation.type === "shake") {
        // drawEndFrame
        console.log(framePercent);
        if (framePercent > 0.5) {
          drawCell(entity, {
            offsetX: -0.5,
          });
        } else {
          drawCell(entity, {
            offsetX: 0.5,
          });
        }
      }
    });
  });
};
