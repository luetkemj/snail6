import Appearance from "../components/Appearance";
import Health from "../components/Health";
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
    { type: Health },
    { type: IsBlocking },
    { type: Layer400 },
    { type: Position },
  ],
};
