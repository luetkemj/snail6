import { Component } from "geotic";

export default class Health extends Component {
  static properties = { current: 10, max: 10 };

  // killing should happen here! not in movement - YEESH that needs a refactor :P
  onTakeDamage(evt) {
    this.current -= evt.data.amount;
    evt.handle();
  }
}
