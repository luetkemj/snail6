import Appearance from "../components/Appearance";
import Layer100 from "../components/Layer100";
import Name from "../components/Name";
import Position from "../components/Position";

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
  ],
};
