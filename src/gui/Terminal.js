import { times } from "lodash";
import { drawCell } from "../lib/canvas";
import { colors } from "../lib/graphics";

export default class Terminal {
  constructor(options = {}) {
    this.height = options.height;
    this.width = options.width;
    this.x = options.x;
    this.y = options.y;
    this.templates = options.templates || []; // array of template objects
    this.options = {};

    this.options.fg = options.fg || colors.hudText;
    this.options.bg = options.bg || colors.defaultBGColor;
    this.options.x = options.x || this.x;
    this.options.y = options.y || this.y;
    this.options.fgA = options.fgA || 1;
    this.options.bgA = options.bgA || 1;

    this.options.fadeY = options.fadeY;
  }

  #drawText(template) {
    const textToRender = template.text;
    textToRender.split("").forEach((char, index) => {
      // we shouldn't have to do this for each char -
      // but gotta refactor drawCell to solve this one...
      const options = { ...this.options, ...template };
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

  #drawInline(templates) {
    let cursor = this.x;
    templates.forEach((tempt) => {
      const tp = {
        ...tempt,
        x: cursor,
        y: tempt.y || this.y,
      };

      this.#drawText(tp);
      cursor += tempt.text.length;
    });
  }

  #drawTemplates() {
    const templates = this.templates.slice(this.templates.length - this.height);
    templates.forEach((template, index) => {
      if (Array.isArray(template)) {
        this.#drawInline(template.map((x) => ({ ...x, y: index + this.y })));
      } else {
        const tempt = {
          ...template,
          x: this.x,
          y: index + this.y,
        };

        if (this.options.fadeY) {
          tempt.fgA = index * 0.75 || 0.5;
        }

        this.#drawText(tempt);
      }
    });
  }

  drawNamePlates(entities) {
    const templates = [];
    let y = this.y;

    entities.forEach((entity, index) => {
      templates.push([
        {
          text: `${entity.appearance.char}` || " ",
          bg: entity.appearance.background,
          fg: entity.appearance.currentColor || entity.appearance.color,
          y,
        },

        {
          text: `: ${entity.name.nomen}`,
          y,
        },
      ]);
      y++;

      if (!entity.isDead && entity.health && entity.health.current > 0) {
        const percent = (entity.health.current / entity.health.max) * 17; // width of nameplates (hud) minus 3
        const bars = Math.ceil(percent);
        if (!bars) return;

        const tempt = [];
        times(bars + 3, (index) => {
          if (index < 3) {
            tempt.push({
              text: " ",
              y,
            });
          } else {
            tempt.push({
              text: "⁗",
              fg:
                (entity.blood && entity.blood.color) ||
                entity.appearance.color ||
                "red",
              y,
            });
          }
        });

        templates.push(tempt);
        y++;
      } else {
        y++;
      }
    });

    this.templates = templates;

    this.draw();
  }

  draw() {
    return this.#drawTemplates();
  }

  update(templates) {
    this.templates = templates;
  }
}

// ONLY SUPPORT TEMPLATES:
// templates: [{ text: '', ...options }, { text: '', ...options }] // one or many lines
// templates: [[{ text: '', ...options }, { text: '', ...options }]] // inline (for multi color things)
