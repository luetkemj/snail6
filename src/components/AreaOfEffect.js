import { Component } from "geotic";

export default class AreaOfEffect extends Component {
  // static allowMultiple = true;

  static properties = {
    damageType: "",
    damageAmount: 0,
    affectRate: 100,
    duration: 1,
    range: 2.5,
    aoeType: "SOILAGE",
    aoeData: {},
  };
}
