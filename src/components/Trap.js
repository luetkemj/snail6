import { Component } from "geotic";

export default class Trap extends Component {
  static allowMultiple = true;

  static properties = {
    triggered: false,
    aoe: {
      // damageAmount: 0,
      // affectRate: 100,
      // duration: 1,
      // range: 2.5,
      // aoeType: "SOILAGE",
      // aoeData: {},
    },
  };

  onContact(evt) {
    if (!this.triggered) {
      this.triggered = true;
      this.entity.add("AreaOfEffect", { ...this.aoe });
    }
  }
}
