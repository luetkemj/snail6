import { drawCell } from "../lib/canvas";
import { colors } from "../lib/graphics";

export default class Terminal {
  constructor(options = {}) {
    this.height = options.height;
    this.width = options.width;
    this.x = options.x;
    this.y = options.y;
    this.text = options.text || ""; // string or array
    this.type = options.type || "LIST"; // [LIST]

    this.options = {};

    this.options.fg = options.fg || colors.defaultColor;
    this.options.bg = options.bg || colors.defaultBGColor;
    this.options.x = options.x || this.x;
    this.options.y = options.y || this.y;
    this.options.fgA = options.fgA || 1;
    this.options.bgA = options.bgA || 1;
  }

  #drawText() {
    let textToRender, options;

    if (typeof this.text === "string") {
      textToRender = this.text;
      options = this.options;
    } else {
      textToRender = this.text.text;
      options = { ...this.options, ...this.text };
    }

    textToRender.split("").forEach((char, charIdx) => {
      const character = {
        appearance: {
          char,
          background: options.bg,
          color: options.fg,
        },
        position: {
          x: charIdx + options.x,
          y: options.y,
        },
      };
      drawCell(character, options);
    });
  }

  drawList() {
    console.log("drawList");
  }

  draw() {
    if (this.options.type === "LIST") {
      this.drawList();
    }
    if (this.type === "TEXT") {
      this.#drawText();
    }
  }
}

// an update method that will auto draw?
// probably not in this world. but an update method that will
// instead auto update the content so that render can draw on next tick
