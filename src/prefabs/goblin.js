import Appearance from "../components/Appearance";
import Blood from "../components/Blood";
import Brain from "../components/Brain";
import Description from "../components/Description";
import Health from "../components/Health";
import Position from "../components/Position";
import { chars, colors } from "../lib/graphics";
import Layer400 from "../components/Layer400";
import IsBlocking from "../components/IsBlocking";
import Name from "../components/Name";
import CanLegend from "../components/CanLegend";
import CanBeAbsorbed from "../components/CanBeAbsorbed";

export default {
  name: "GoblinPrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.goblin,
        char: chars.goblin,
      },
    },
    { type: Blood },
    { type: CanBeAbsorbed },
    { type: Brain, properties: { ai: "goblin" } },
    { type: Health, properties: { current: 10, max: 10 } },
    { type: IsBlocking },
    { type: Layer400 },
    { type: Name, properties: { nomen: "goblin" } },
    { type: Position },
    { type: CanLegend },
    {
      type: Description,
      properties: {
        text: "It's a stinky snarling goblin.",
        default: "It's a stinky snarling goblin.",
        soiled: "The floor is sticky with [SOILAGE].",
        dead: "The crumpled corpse of a dirty goblin lay at my feet.",
      },
    },
  ],
};
