import Appearance from "../components/Appearance";

import { chars, colors } from "../lib/graphics";

export default {
  name: "FloorPrefab",

  inherit: ["TilePrefab"],

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.floor,
        char: chars.floor,
      },
    },
  ],
};
