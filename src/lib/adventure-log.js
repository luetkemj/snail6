import { gameState } from "../state/ecs";

export const log = (entry, entity) => {
  // if entity is an array (from a filter on an entity group for player)
  if (entity && Array.isArray(entity)) return;

  if (!entity || entity.name.nomen === "player") {
    gameState.adventureLog.push(entry);
  }
};

export const innerLog = (entry, entity) => {
  if (!entity || entity.name.nomen === "player") {
    gameState.innerMonologue.push(entry);
  }
};
