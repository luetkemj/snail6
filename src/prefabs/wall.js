import Appearance from "../components/Appearance";
import IsBlocking from "../components/IsBlocking";
import IsOpaque from "../components/IsOpaque";
import Layer100 from "../components/Layer100";
import Position from "../components/Position";
import Description from "../components/Description";

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
    { type: Name, properties: { nomen: "wall" } },
    {
      type: Description,
      properties: {
        text: "The wall is hard and unmoving.",
        default: "The wall is hard and unmoving.",
        soiled: "The wall is splattered with [SOILAGE]",
        dead: "",
      },
    },
  ],
};
