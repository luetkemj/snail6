import { Component } from "geotic";

export default class Light extends Component {
  static properties = {
    a: 0,
    sources: new Set(),
    color: null,
  };
}
