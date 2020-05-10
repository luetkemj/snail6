import color from "color";

export const colors = {
  defaultColor: color("#ff0077"),
  defaultBGColor: color("#000"),

  inventoryHighlight: color("#A9CCE3"),

  // light:
  torchLight: color("#FFD00E"),
  campfire: color("#FFD00E"),

  // staging:
  fountain: color("#3366FF"),

  // items:
  armor: color("#DAA520"),
  bandage: color("#F7DC6F"),
  chest: color("#DAA520"),
  currency: color("#DAA520"),
  multipleItems: color("#DAA520"),
  potion: color("#DAA520"),
  weapon: color("#DAA520"),
  // log
  hudText: color("#fff"),
  healthBar: color("#B91906"),
  // maps
  wall: color("#AAA"),
  floor: color("#555"),
  cavernFloor: color("#71331E"),
  stairsUp: color("#AAA"),
  stairsDown: color("#AAA"),
  // player
  player: color("#FFF"),
  // monsters
  goblin: color("#0C9"),
  rat: color("#F1948A"),
};

export const chars = {
  defaultChar: "?",
  // staging
  campfire: "ô", // ö o
  fountain: "⨀", // ⦿ ⦾ ◯ ⨀ ⊚
  // equipment
  armor: "[",
  weapon: ")",
  // containers
  chest: "=",
  // items
  currency: "*",
  potion: "!",
  multipleItems: "&",
  item: "~",
  // maps
  wall: "#",
  floor: "•",
  cavernFloor: "•",
  stairsUp: "<",
  stairsDown: ">",
  // tracks
  track: "•",
  // player
  player: "@",
  // monsters
  goblin: "g",
  rat: "r",
};
