let chalk = require("chalk");

module.exports = class TextIndicator {
  constructor(zIndex, x, y, text) {
    this.zIndex = zIndex;
    this.height = 1;
    this.width = 1;
    this.x = x;
    this.y = y;
    this.text = text;
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

    for (let i = 0; i < this.width; i++) {
      this.renderArray[0].push(chalk.rgb(15, 255, 15)(this.text.charAt(i)));
    }
  }

  setText(text) {
    this.text = `Score: ${text}/3`;
  }
};
