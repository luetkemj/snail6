import Appearance from "../components/Appearance";
import Layer100 from "../components/Layer100";
import Position from "../components/Position";

export default {
  name: "TilePrefab",

  components: [
    {
      type: Appearance,
    },
    { type: Layer100 },
    {
      type: Position,
    },
  ],
};
