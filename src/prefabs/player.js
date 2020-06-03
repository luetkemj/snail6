import Appearance from "../components/Appearance";
import Blood from "../components/Blood";
import Health from "../components/Health";
import Position from "../components/Position";
import { chars, colors } from "../lib/graphics";
import Layer400 from "../components/Layer400";
import IsBlocking from "../components/IsBlocking";
import Name from "../components/Name";

export default {
  name: "PlayerPrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.player,
        char: chars.player,
      },
    },
    { type: Blood },
    { type: Health, properties: { current: 50000, max: 50 } },
    { type: IsBlocking },
    { type: Layer400 },
    { type: Name, properties: { nomen: "player" } },
    { type: Position },
  ],
};
