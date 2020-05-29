import Appearance from "../components/Appearance";
import IsBlocking from "../components/IsBlocking";
import IsOpaque from "../components/IsOpaque";
import Layer100 from "../components/Layer100";
import Position from "../components/Position";

import { chars, colors } from "../lib/graphics";
import Name from "../components/Name";

export default {
  name: "WallPrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.wall,
        char: chars.wall,
      },
    },
    { type: IsBlocking },
    { type: IsOpaque },
    { type: Layer100 },
    { type: Position },
    { type: Name, properties: { nomen: 'wall' } },
  ],
};
