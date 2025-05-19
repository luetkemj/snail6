import MoveTo from "../components/MoveTo";
import { nuke, splatterBlood } from "../systems/movement";
import { gameState, player, loadGame, saveGame } from "../state/ecs";

export const input = (key) => {
    switch (key) {
        case "L":
            gameState.userInput = { key, type: "LOAD", payload: {} };
            break;
        case "S":
            gameState.userInput = { key, type: "SAVE", payload: {} };
            break;
        case "z":
            gameState.userInput = { key, type: "REST", payload: {} };
            break;

        // debug codes:
        case "N":
            gameState.userInput = { key, type: "NUKE", payload: {} };
            break;
        case "B":
            gameState.userInput = { key, type: "BLOOD", payload: {} };
            break;
        case "O":
            gameState.userInput = { key, type: "OMNISCIENT", payload: {} };
            break;

        // Movement
        case "ArrowUp":
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: 0, y: -1 },
            };
            break;
        case "ArrowDown":
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: 0, y: 1 },
            };
            break;
        case "ArrowLeft":
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: -1, y: 0 },
            };
            break;
        case "ArrowRight":
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: 1, y: 0 },
            };
            break;
        case "1": // SW
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: -1, y: 1 },
            };
            break;
        case "2": // SOUTH
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: 0, y: 1 },
            };
            break;
        case "3": // SE
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: 1, y: 1 },
            };
            break;
        case "4": // WEST
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: -1, y: 0 },
            };
            break;
        case "6": // EAST
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: 1, y: 0 },
            };
            break;
        case "7": // NW
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: -1, y: -1 },
            };
            break;
        case "8": // NORTH
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: 0, y: -1 },
            };
            break;
        case "9": // NE
            gameState.userInput = {
                key,
                type: "MOVE",
                payload: { x: 1, y: -1 },
            };
            break;
    }
};

export const processUserInput = () => {
    if (!gameState.userInput) {
        return;
    }

    const { key, type, payload } = gameState.userInput;

    if (type === "BLOOD") {
        splatterBlood(player);
    }

    if (type === "NUKE") {
        nuke();
    }

    if (type === "OMNISCIENT") {
        gameState.omniscient = !gameState.omniscient;
    }

    if (type === "MOVE") {
        player.add(MoveTo, payload);
    }

    if (type === "SAVE") {
        saveGame();
    }

    if (type === "LOAD") {
        loadGame();
    }
};
