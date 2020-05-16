import Appearance from "../components/Appearance";
import IsBlocking from "../components/IsBlocking";
import IsOpaque from "../components/IsOpaque";

import { chars, colors } from "../lib/graphics";

export default {
  name: "WallPrefab",

  inherit: ["TilePrefab"],

  components: [
    { type: IsBlocking },
    { type: IsOpaque },
    {
      type: Appearance,
      properties: {
        color: colors.wall,
        char: chars.wall,
      },
    },
  ],
};
