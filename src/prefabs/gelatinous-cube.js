import Appearance from "../components/Appearance";
import Blood from "../components/Blood";
import isBoneless from "../components/isBoneless";
import Brain from "../components/Brain";
import CanAbsorb from "../components/CanAbsorb";
import Description from "../components/Description";
import Health from "../components/Health";
import Position from "../components/Position";
import { colors } from "../lib/graphics";
import Layer400 from "../components/Layer400";
import IsBlocking from "../components/IsBlocking";
import Name from "../components/Name";
import CanLegend from "../components/CanLegend";

export default {
  name: "GelatinousCubePrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: "",
        char: "",
        background: colors.gelatinousCube,
      },
    },
    { type: Blood, properties: { color: colors.gelatinousCube } },
    { type: Brain, properties: { ai: "gelatinousCube" } },
    { type: CanAbsorb },
    { type: Health, properties: { current: 100, max: 100 } },
    { type: IsBlocking },
    { type: isBoneless },
    { type: Layer400 },
    { type: Name, properties: { nomen: "Jelly" } },
    { type: Position },
    { type: CanLegend },
    {
      type: Description,
      properties: {
        text: "It's a woobly, wobbly jelly!",
        default: "It's a woobly, wobbly jelly!",
        soiled: "",
        dead: "Chunks of jelly are scattered about.",
      },
    },
  ],
};
