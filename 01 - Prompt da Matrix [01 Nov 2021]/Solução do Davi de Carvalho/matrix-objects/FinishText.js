let chalk = require("chalk");

module.exports = class FinishText {
  constructor(zIndex, x, y, time, text) {
    this.zIndex = zIndex;
    this.height = 1;
    this.width = 1;
    this.state = text;
    this.text = `You ${text}! (Time spent: ${Math.round(time / 1000)} seconds)`;
    this.x = x - Math.round(this.text.length / 2);
    this.y = y - 1;
    this.renderArray = [];
    this.toDestroy = false;
  }

  configRender() {
    this.renderArray = [];
    this.renderArray[0] = [];

    if (this.height <= 0) {
      this.toDestroy = true;
      return;
    }

    this.width = this.text.length;

    let r = 255;
    let g = 255;
    let b = 15;

    if (this.state == "lose") {
      g = 15;
      b = 255;
    }

    for (let i = 0; i < this.width; i++) {
      this.renderArray[0].push(chalk.rgb(r, g, b)(this.text.charAt(i)));
    }
  }
};
