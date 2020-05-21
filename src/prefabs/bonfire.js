import Appearance from "../components/Appearance";
import IsBlocking from "../components/IsBlocking";
import Position from "../components/Position";
import { chars, colors } from "../lib/graphics";
import Layer400 from "../components/Layer400";
import LightSource from "../components/LightSource";

export default {
  name: "BonfirePrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.campfire,
        char: chars.campfire,
      },
    },
    { type: IsBlocking },
    { type: Layer400 },
    // {
    //   type: LightSource,
    //   properties: {
    //     range: 4,
    //   },
    // },
    { type: Position },
  ],
};
