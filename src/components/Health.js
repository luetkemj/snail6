import { Component } from "geotic";

export default class Health extends Component {
  static properties = { current: 10, max: 10 };

  onTakeDamage(evt) {
    this.current -= evt.data.amount;
    evt.handle();
  }
}
