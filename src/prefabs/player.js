import Appearance from "../components/Appearance";
import { chars, colors } from "../lib/graphics";
import Layer400 from "../components/Layer400";

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
    {
      type: Layer400,
    },
  ],
};
