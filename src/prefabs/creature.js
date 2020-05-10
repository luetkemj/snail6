import Appearance from "../components/Appearance";
import Position from "../components/Position";

export default {
  name: "CreaturePrefab",

  components: [
    {
      type: Appearance,
    },
    {
      type: Position,
    },
  ],
};
