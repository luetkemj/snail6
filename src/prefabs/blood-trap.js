import Appearance from "../components/Appearance";
import Blood from "../components/Blood";
import Position from "../components/Position";
import { chars, colors } from "../lib/graphics";
import Layer300 from "../components/Layer300";
import Name from "../components/Name";
import Description from "../components/Description";
import Trap from "../components/Trap";

export default {
  name: "TrapPrefab",

  components: [
    {
      type: Appearance,
      properties: {
        color: colors.blood,
        char: chars.floor,
      },
    },
    { type: Blood },
    { type: Layer300 },
    { type: Position },
    { type: Name, properties: { nomen: "trap" } },
    {
      type: Trap,
      properties: {
        aoe: {
          damageAmount: 0,
          affectRate: 72,
          duration: 1,
          range: 1.5,
          aoeType: "SOILAGE",
          aoeData: {
            name: "blood",
            color: colors.blood,
          },
        },
      },
    },
    {
      type: Description,
      properties: {
        text: "...",
        default: "...",
        soiled: "",
        dead: "",
      },
    },
  ],
};
