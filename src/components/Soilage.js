import { Component } from "geotic";
import { colors } from "../lib/graphics";
import { SOIL } from "../state/events";
import { log } from "../lib/adventure-log";

export default class Soilage extends Component {
  static allowMultiple = true;

  static properties = {
    color: colors.defaultColor,
    name: "blood",
    sourceName: "",
    sourceEntityId: "",
  };

  onAttached(evt) {
    if (
      this.entity.name.nomen === "player" &&
      this.entity.soilage.length === 1
    ) {
      log([
        { text: "COVERED IN BLOOD! ", fg: this.color },
        { text: "Watch out for " },
        { text: "skellies", fg: colors.skeleton },
        { text: " and " },
        { text: "jellies", fg: colors.gelatinousCube },
        { text: "!" },
      ]);
    }

    this.entity.fireEvent(SOIL, { color: this.color });
  }

  onClean(evt) {
    this.destroy();
  }
}
