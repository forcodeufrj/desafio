let chalk = require("chalk");

module.exports = class Apple {
  constructor(zIndex, x, y) {
    this.zIndex = zIndex;
    this.height = 1;
    this.width = 1;
    this.x = x;
    this.y = y;
    this.charIndex = 0;
    this.renderArray = [];
    this.renderArray[0] = [];
    this.textSprite = "@";
    this.toDestroy = false;
  }

  configRender() {
    this.renderArray = [];
    this.renderArray[0] = [];

    if (this.height <= 0) {
      this.toDestroy = true;
      return;
    }

    this.renderArray[0].push(chalk.rgb(15, 255, 15)(this.textSprite));
  }
};
