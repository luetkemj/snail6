import Appearance from "../components/Appearance";
import IsBlocking from "../components/IsBlocking";
import Position from "../components/Position";
import { chars, colors } from "../lib/graphics";
import Layer300 from "../components/Layer300";
import Name from "../components/Name";
import CanLegend from "../components/CanLegend";
import Description from "../components/Description";

export default {
  name: "FountainPrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.fountain,
        char: chars.fountain,
      },
    },
    { type: IsBlocking },
    { type: Layer300 },
    { type: Position },
    { type: Name, properties: { nomen: "fountain" } },
    { type: CanLegend },

    {
      type: Description,
      properties: {
        text: "It's a fountain!",
        default: "It's a fountain!",
        soiled: "",
        dead: "",
      },
    },
  ],
};
