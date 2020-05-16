import Appearance from "../components/Appearance";
import { chars, colors } from "../lib/graphics";

export default {
  name: "CavernFloorPrefab",

  inherit: ["TilePrefab"],

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.cavernFloor,
        char: chars.cavernFloor,
      },
    },
  ],
};
