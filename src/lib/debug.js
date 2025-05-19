import { sample } from "lodash";
import ecs, { cache } from "../state/ecs";
import { drawCell } from "../lib/canvas";
import { colors } from "../lib/graphics";
import { rectangle, toCell } from "../lib/grid";
import allChars from "./all-chars";

const colorNames = [
    "CRIMSON",
    "PALEVIOLETRED",
    "TOMATO",
    "ORANGERED",
    "DARKORANGE",
    "KHAKI",
    "DARKSLATEBLUE",
    "VIOLET",
    "DARKCYAN",
    "SEAGREEN",
    "STEELBLUE",
    "MEDIUMSLATEBLUE",
];

// render dijkstra
export const renderDijkstra = (dMapName) => {
    Object.keys(cache.dijkstraMaps[dMapName]).forEach((locId) => {
        drawCell(
            {
                appearance: {
                    char: cache.dijkstraMaps.player[locId],
                    background: "transparent",
                },
                position: toCell(locId),
            },
            { fgA: 0.5, size: 16 }
        );
    });
};

export const renderOmniscience = () => {
    [...ecs.entities.all].forEach((entity) => {
        const {
            isInFov,
            isRevealed,
            appearance,
            layer100,
            layer200,
            layer300,
            layer400,
        } = entity;
        // if it has been revealed draw normally.
        if (isInFov) {
            drawCell(entity, {
                fg: appearance.currentColor || appearance.color,
            });
        }

        if (isRevealed && !isInFov) {
            drawCell(entity, {
                fg: colors.revealedColor,
            });
        }

        // if no alpha, draw each layer with a different color
        if (!isRevealed) {
            if (layer100) {
                drawCell(entity, { fg: "#101250", fgA: 1 });
            }
            if (layer200) {
                drawCell(entity, { fg: "#102250", fgA: 1 });
            }
            if (layer300) {
                drawCell(entity, { fg: "#103250", fgA: 1 });
            }
            if (layer400) {
                drawCell(entity, { fg: "#104250", fgA: 1 });
            }
        }
    });
};

export const renderAllChars = (rotate) => {
    const charEntities = [];

    if (!cache.allChars.length) {
        const cells = rectangle({ x: 0, y: 0, width: 100, height: 30 });
        Object.keys(cells.tiles).forEach((tileId, index) => {
            if (allChars[index]) {
                const currTile = cells.tiles[tileId];
                const entity = ecs.createPrefab("CharPrefab", {
                    position: { x: currTile.x, y: currTile.y },
                    appearance: {
                        char: allChars[index],
                        // color: index % 2 ? "red" : "yellow",
                        color: sample(colorNames),
                    },
                });
                charEntities.push(entity);
                cache.addSet("entitiesAtLocation", tileId, entity.id);
            }
        });

        cache.allChars = charEntities;
    }

    cache.allChars.forEach((entity) => {
        drawCell(entity, { rotate });
    });
};
