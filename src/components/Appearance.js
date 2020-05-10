import { Component } from "geotic";
import { chars, colors } from "../lib/graphics";
import { layers } from "../lib/canvas";

export default class Appearance extends Component {
  static properties = {
    color: colors.defaultColor,
    char: chars.defaultChar,
    background: "transparent",
    layer: layers.ground,
  };
}
