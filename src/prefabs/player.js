import Appearance from "../components/Appearance";
import { chars, colors } from "../lib/graphics";

export default {
  name: "PlayerPrefab",

  inherit: ["CreaturePrefab"],

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.player,
        char: chars.player,
      },
    },
  ],
};
