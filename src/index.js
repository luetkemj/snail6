import "./style.scss";

import _ from "lodash";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Hello", "webpacky o"], " ");

  return element;
}

document.body.appendChild(component());
