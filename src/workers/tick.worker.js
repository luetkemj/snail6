import { toCell } from "../lib/grid";

self.onmessage = function (event) {
  // console.log("tick:", event);

  self.postMessage(toCell("1,3"));
};
