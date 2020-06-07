import { gameState } from "../state/ecs";

export const log = (entry) => {
  gameState.adventureLog.push(entry);
};

export const innerLog = (entry) => {
  gameState.innerMonologue.push(entry);
};
