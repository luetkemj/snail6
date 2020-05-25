import { colors } from "../lib/graphics";
import { Component } from "geotic";

export default class Animate extends Component {
  static properties = {
    allowMultiple: true,

    startTime: null,
    duration: 100,
    animation: {
      type: "color",
      stops: [colors.defaultColor],
    },
  };

  onSetStartTime(evt) {
    this.startTime = evt.data.time;
    evt.handle();
  }

  onRemove() {
    console.log("Animation over!");
  }
}
