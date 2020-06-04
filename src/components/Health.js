import { Component } from "geotic";
import { log } from "../lib/adventure-log";

export default class Health extends Component {
  static properties = { current: 10, base: 10 };

  onTakeDamage(evt) {
    this.current -= evt.data.amount;
    log({ text: "Ouch!" });
    evt.handle();
  }
}
