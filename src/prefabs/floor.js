import Appearance from "../components/Appearance";
import Description from "../components/Description";
import Layer100 from "../components/Layer100";
import Name from "../components/Name";
import Position from "../components/Position";
import CanBeAbsorbed from "../components/CanBeAbsorbed";

import { chars, colors } from "../lib/graphics";

export default {
  name: "FloorPrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.floor,
        char: chars.floor,
      },
    },
    { type: Layer100 },
    { type: Position },
    { type: Name, properties: { nomen: "floor" } },
    { type: CanBeAbsorbed },
    {
      type: Description,
      properties: {
        text: "The hard stone is cold beneath my feet.",
        default: "The hard stone is cold beneath my feet.",
        soiled: "The floor is sticky with [SOILAGE].",
        dead: "",
      },
    },
  ],
};
