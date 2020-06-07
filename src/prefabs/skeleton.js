import Appearance from "../components/Appearance";
import Brain from "../components/Brain";
import Health from "../components/Health";
import Position from "../components/Position";
import { chars, colors } from "../lib/graphics";
import Layer400 from "../components/Layer400";
import IsBlocking from "../components/IsBlocking";
import Name from "../components/Name";
import CanLegend from "../components/CanLegend";
import Description from "../components/Description";

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
    { type: Health, properties: { current: 30, max: 30 } },
    { type: IsBlocking },
    { type: Layer400 },
    { type: Name, properties: { nomen: "skeleton" } },
    { type: Position },
    { type: CanLegend },
    {
      type: Description,
      properties: {
        text: "It's a dead eyed skeleton!",
        default: "It's a dead eyed skeleton!",
        soiled: "",
        dead: "The shattered remains of a skeleton are on the floor.",
      },
    },
  ],
};
