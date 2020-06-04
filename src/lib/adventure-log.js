import { gameState } from "../state/ecs";

export const log = (entry) => {
  gameState.adventureLog.push(entry);
};
