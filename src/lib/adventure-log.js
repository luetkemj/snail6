import { gameState } from "../state/ecs";

export const log = (entry, entity) => {
  // if entity is an empty array (from a filter on an entity group for player)
  if (entity && Array.isArray(entity) && !entity.length) return;

  if (Array.isArray(entity) && entity[0].name.nomen === "player") {
    return gameState.adventureLog.push(entry);
  }

  if (!entity || entity.name.nomen === "player") {
    return gameState.adventureLog.push(entry);
  }
};

export const innerLog = (entry, entity) => {
  // if entity is an empty array (from a filter on an entity group for player)
  if (entity && Array.isArray(entity) && !entity.length) return;

  if (Array.isArray(entity) && entity[0].name.nomen === "player") {
    return gameState.innerMonologue.push(entry);
  }

  if (!entity || entity.name.nomen === "player") {
    return gameState.innerMonologue.push(entry);
  }
};
