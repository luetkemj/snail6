import Appearance from "../components/Appearance";
import IsOpaque from "../components/IsOpaque";
import Position from "../components/Position";

export default {
  name: "CreaturePrefab",

  components: [{ type: Appearance }, { type: IsOpaque }, { type: Position }],
};
