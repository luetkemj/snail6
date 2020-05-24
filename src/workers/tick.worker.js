self.onmessage = function (event) {
  console.log("tick:", event);

  self.postMessage("done poop");
};
