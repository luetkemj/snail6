import ecs, { cache } from "../state/ecs";
import { SOIL, TAKE_DAMAGE } from "../state/events";
import { random, sample, times } from "lodash";
import { aoeEntities, soiledEntities } from "../queries";
import { circle } from "../lib/grid";
import { dijkstra } from "../lib/dijkstra";

const popRandom = (array) => {
  let i = (Math.random() * array.length) | 0;
  return array.splice(i, 1)[0];
};

export const aoe = () => {
  aoeEntities.get().forEach((entity) => {
    const aoe = entity.areaOfEffect;

    console.log(entity.serialize());

    const locIdsInRange = circle(entity.position, aoe.range);

    times(locIdsInRange.length, () => {
      if (random(1, 100) > aoe.affectRate) {
        popRandom(locIdsInRange);
      }
    });

    // AOE TYPES:
    // SOILAGE
    if ((aoe.aoeType = "SOILAGE")) {
      locIdsInRange.forEach((locId) => {
        const esAtLoc = cache.readObj("entitiesAtLocation", locId);
        if (esAtLoc) {
          esAtLoc.forEach((eId) => {
            const e = ecs.getEntity(eId);
            e.add("Soilage", {
              color: aoe.aoeData.color,
              name: aoe.aoeData.name,
              sourceEntityId: entity.id,
              sourceName: entity.name.nomen,
            });
            e.fireEvent(SOIL, { text: `${entity.name.nomen} blood` });

            // apply damage of type to all effect entities
            e.fireEvent(TAKE_DAMAGE, { amount: aoe.damageAmount });
          });
        }
      });

      // currently we only have blood for soilage so we can do this:
      const bloodDijkstraMap = dijkstra(
        [...soiledEntities.get()].map((x) => x.position)
      );
      cache.addObj("dijkstraMaps", "blood", bloodDijkstraMap);
    }

    // decrement duration
    aoe.duration--;

    // if duration === 0 remove this component
    if (aoe.duration < 1) {
      aoe.remove(false); // don't destroy just remove
    }
  });
};
