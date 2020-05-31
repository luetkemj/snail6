import Appearance from "../components/Appearance";
import Brain from "../components/Brain";
import Health from "../components/Health";
import Position from "../components/Position";
import { chars, colors } from "../lib/graphics";
import Layer400 from "../components/Layer400";
import IsBlocking from "../components/IsBlocking";
import Name from "../components/Name";

export default {
  name: "SkeletonPrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.skeleton,
        char: chars.skeleton,
      },
    },
    { type: Brain, properties: { ai: "skeleton" } },
    { type: Health },
    { type: IsBlocking },
    { type: Layer400 },
    { type: Name, properties: { nomen: "skeleton" } },
    { type: Position },
  ],
};
