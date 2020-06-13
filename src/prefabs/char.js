import Appearance from "../components/Appearance";
import CanBeAbsorbed from "../components/CanBeAbsorbed";
import Layer400 from "../components/Layer400";
import Name from "../components/Name";
import Position from "../components/Position";

import { chars, colors } from "../lib/graphics";

export default {
  name: "CharPrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: "#FFF",
        char: chars.floor,
      },
    },
    { type: CanBeAbsorbed },
    { type: Layer400 },
    { type: Position },
    { type: Name, properties: { nomen: "char" } },
  ],
};
