import { Component } from "geotic";
import { colors } from "../lib/graphics";
import { SOIL } from "../state/events";

export default class Soilage extends Component {
  static allowMultiple = true;

  static properties = {
    color: colors.defaultColor,
    name: "blood",
    sourceName: "",
    sourceEntityId: "",
  };

  onAttached(evt) {
    this.entity.fireEvent(SOIL, { color: this.color });
  }

  onClean(evt) {
    this.destroy();
  }
}
