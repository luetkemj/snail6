import { Component } from "geotic";

export default class MoveTo extends Component {
  static properties = {
    x: 0,
    y: 0,
    relative: true, // x,y are relative to current loc or exact
  };
}
