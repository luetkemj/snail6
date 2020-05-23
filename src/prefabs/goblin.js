import Appearance from "../components/Appearance";
import IsOpaque from "../components/IsOpaque";
import Position from "../components/Position";
import { chars, colors } from "../lib/graphics";
import Layer400 from "../components/Layer400";
import IsBlocking from "../components/IsBlocking";

export default {
  name: "GoblinPrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.goblin,
        char: chars.goblin,
      },
    },
    { type: IsBlocking },
    { type: IsOpaque },
    { type: Layer400 },
    { type: Position },
  ],
};
