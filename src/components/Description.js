import { Component } from "geotic";
import { innerLog } from "../lib/adventure-log";

export default class Description extends Component {
  static properties = {
    text: "",
    default: "",
    soiled: "",
    dead: "",
  };

  onSoil(evt) {
    if (evt.data.text && this.soiled) {
      this.text = this.soiled
        .replace("[SOILAGE]", evt.data.text)
        .replace("player", "my");
    }
  }

  onKill(evt) {
    if (evt.data.text && this.dead) {
      this.text = this.dead;
    }

    evt.handle();
  }

  onClean(evt) {
    this.text = this.default;
  }

  onObserve(evt) {
    innerLog({ text: this.text });
  }
}
