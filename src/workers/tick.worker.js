import ecs, { cache, player, gameState } from "../state/ecs";
import { cellToId } from "../lib/grid";
import { processUserInput } from "../lib/process-user-input";
import { fov } from "../systems/fov";
import { movement } from "../systems/movement";

import initDungeonLevel from "../initializers/dungeon-level.init";

import { layer100Entities, layer400Entities } from "../queries";

const getLayeredPayload = () => {
  const layer100 = [];
  const layer400 = [];

  layer100Entities.get().forEach((x) => layer100.push(x.serialize()));
  layer400Entities.get().forEach((x) => layer400.push(x.serialize()));

  return { layer100, layer400 };
};

self.onmessage = function (event) {
  const { action, payload } = event.data;

  if (action === "INIT_DUNGEON_LEVEL") {
    const dungeon = initDungeonLevel();
    player.position.x = dungeon.start.x;
    player.position.y = dungeon.start.y;

    cache.addSet("entitiesAtLocation", cellToId(dungeon.start), player.id);

    self.postMessage({ action, payload: getLayeredPayload() });
  }

  if (action === "TICK") {
    // if (payload.playerTurn) {
    //   console.time("pTimer");
    // } else {
    //   console.time("wTimer");
    // }

    if (payload.playerTurn) {
      processUserInput(payload.userInput);
    }

    movement();

    if (payload.playerTurn) {
      fov();
      fov();
      fov();
      fov();
      fov();
      fov();
      fov();
      fov();
      fov();
      fov();
    }

    // if (payload.playerTurn) {
    //   console.timeEnd("pTimer");
    // } else {
    //   console.timeEnd("wTimer");
    // }

    self.postMessage({ action, payload: getLayeredPayload() });
  }
};
