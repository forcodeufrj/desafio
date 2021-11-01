let chalk = require("chalk");

module.exports = class FallingText {
  constructor(zIndex, height, x, y) {
    this.zIndex = zIndex;
    this.height = height;
    this.width = 1;
    this.x = x;
    this.y = y;
    this.charIndex = 0;
    this.allChars =
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    this.renderArray = [];
    this.toDestroy = false;
  }

  configRender() {
    this.renderArray = [];

    if (this.height <= 0) {
      this.toDestroy = true;
      return;
    }

    for (let i = 0; i < this.height; i++) {
      this.renderArray.push(
        chalk.rgb(
          15,
          255 - Math.round((i * 255) / (this.height + 1)),
          15
        )(
          this.allChars[Math.round(Math.random() * this.allChars.length)] || "A"
        )
      );
    }

    this.height -= 1;
  }
};
