import Appearance from "../components/Appearance";
import IsOpaque from "../components/IsOpaque";
import Position from "../components/Position";
import { chars, colors } from "../lib/graphics";
import Layer400 from "../components/Layer400";

export default {
  name: "PlayerPrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.player,
        char: chars.player,
      },
    },
    { type: IsOpaque },
    { type: Layer400 },
    { type: Position },
  ],
};
