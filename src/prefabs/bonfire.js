import Appearance from "../components/Appearance";
import IsBlocking from "../components/IsBlocking";
import Position from "../components/Position";
import { chars, colors } from "../lib/graphics";
import Layer300 from "../components/Layer300";
import Name from "../components/Name";

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
    { type: Layer300 },
    { type: Position },
    { type: Name, properties: { nomen: 'bonfire' }  }
  ],
};
