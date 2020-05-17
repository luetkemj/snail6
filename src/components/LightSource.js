import { Component } from "geotic";
import { colors } from "../lib/graphics";

export default class LightSource extends Component {
  static properties = {
    range: 1,
    color: colors.torchLight,
    weight: 0.1,
  };
}
