import { drawCell } from "../lib/canvas";
import { colors } from "../lib/graphics";

export default class Terminal {
  constructor(options = {}) {
    this.height = options.height;
    this.width = options.width;
    this.x = options.x;
    this.y = options.y;
    this.text = options.text || []; // object or array
    this.options = {};

    this.options.fg = options.fg || colors.hudText;
    this.options.bg = options.bg || colors.defaultBGColor;
    this.options.x = options.x || this.x;
    this.options.y = options.y || this.y;
    this.options.fgA = options.fgA || 1;
    this.options.bgA = options.bgA || 1;

    this.options.fadeY = options.fadeY || false;
  }

  #drawText(opt = {}) {
    const textToRender = opt.text || this.text;
    textToRender.split("").forEach((char, index) => {
      // we shouldn't have to do this for each char -
      // but gotta refactor drawCell to solve this one...
      const options = { ...this.options, ...opt };
      const character = {
        appearance: {
          char,
          background: options.bg,
          color: options.fg,
        },
        position: {
          x: index + options.x,
          y: options.y,
        },
      };

      delete options.x;
      delete options.y;

      drawCell(character, options);
    });
  }

  #drawList() {
    const logs = this.text.slice(this.text.length - this.height);
    logs.forEach((entry, index) => {
      const options = {
        ...entry,
        x: this.x,
        y: index + this.y,
      };

      if (this.options.fadeY) {
        options.fgA = index * 0.75 || 0.5;
      }

      this.#drawText(options);
    });
  }

  draw() {
    if (Array.isArray(this.text)) {
      this.#drawList();
    } else {
      this.#drawText();
    }
  }
}
