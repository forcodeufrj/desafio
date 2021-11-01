let FallingText = require("./matrix-objects/FallingText.js");
let Player = require("./matrix-objects/Player.js");
let TextIndicator = require("./matrix-objects/TextIndicator.js");
let Apple = require("./matrix-objects/Apple.js");
let Asteroid = require("./matrix-objects/Asteroid.js");
let FinishText = require("./matrix-objects/FinishText.js");

let isMatrixRunning = true;
let matrixObjects = [];
let framesPerSecond = 30;
let matrixRenderArray = [];

let player;
let score;
let time;

let isGameFinished;
let isLose;

let generationFactor;
let speedFactor;

let consoleWidth = 0;
let consoleHeight = 0;

start();

function start() {
  console.clear();

  score = 0;
  time = 0;
  isLose = false;
  isGameFinished = false;
  matrixObjects = [];
  generationFactor = 0;
  speedFactor = 0;

  setConsoleSize();

  createObjects();

  buildMatrixRenderArray();

  matrixLoop();
}

function createObjects() {
  player = new Player(0, consoleHeight - 4, 4, 5);
  matrixObjects.push(new FallingText(0, consoleHeight - 4, 4, 5));
  matrixObjects.push(new TextIndicator(0, 2, 1, `Score: ${score}/3`));
  matrixObjects.push(new Asteroid(0, consoleWidth, 5));
  matrixObjects.push(player);
  createAnApple();
}

function setConsoleSize() {
  consoleWidth = process.stdout.columns || 10;
  consoleHeight = process.stdout.rows || 10;
}

async function matrixLoop() {
  setConsoleSize();

  if (score >= 3 && !isGameFinished) {
    matrixObjects = [];

    matrixObjects.push(
      new FinishText(
        0,
        Math.round(consoleWidth / 2),
        Math.round(consoleHeight / 2),
        time,
        "won"
      )
    );

    isGameFinished = true;
  } else if (score < 0 && !isLose) {
    matrixObjects = [];

    matrixObjects.push(
      new FinishText(
        0,
        Math.round(consoleWidth / 2),
        Math.round(consoleHeight / 2),
        time,
        "lose"
      )
    );

    isLose = true;
  } else {
    time += framesPerSecond;
  }

  checkCollisions();

  createAnAsteroyd();

  deleteObjects();

  resetMatrixRenderArray();
  setRenderMatrix();

  await setTimeout(
    isMatrixRunning ? matrixLoop : false,
    (1 / framesPerSecond) * 1000
  );
}

function checkCollisions() {
  if (isGameFinished || isLose) {
    return;
  }

  let apple = matrixObjects.filter(
    (obj) => Object.getPrototypeOf(obj) === Apple.prototype
  )[0];

  let thePlayer = matrixObjects.filter(
    (obj) => Object.getPrototypeOf(obj) === Player.prototype
  )[0];

  let textIndicator = matrixObjects.filter(
    (obj) => Object.getPrototypeOf(obj) === TextIndicator.prototype
  )[0];

  let asteroids = matrixObjects.filter(
    (obj) => Object.getPrototypeOf(obj) === Asteroid.prototype
  );

  if (apple && apple.x === thePlayer.x && apple.y === thePlayer.y) {
    score++;
    apple.toDestroy = true;
    textIndicator.setText(score);
    createAnApple();
  }

  if (asteroids) {
    asteroids.forEach((ast) => {
      if (ast.x === thePlayer.x && ast.y === thePlayer.y) {
        score -= 2;
        ast.toDestroy = true;
      }
    });
  }
}

function createAnApple() {
  if (isGameFinished || isLose) {
    return;
  }

  let x = Math.round(Math.random() * (consoleWidth - 2) + 1);
  let y = Math.round(Math.random() * (consoleHeight - 4) + 3);

  matrixObjects.push(new Apple(0, x, y));
}

function createAnAsteroyd() {
  if (isGameFinished || isLose) {
    return;
  }

  if (score >= 0) {
    generationFactor = score * 0.25;

    speedFactor = Math.round(score * Math.random());
  }

  if (Math.random() < 0.8 - generationFactor) {
    return;
  }

  let x = Math.round(consoleWidth);
  let y = Math.round(Math.random() * (consoleHeight - 4) + 3);

  matrixObjects.push(new Asteroid(0, x, y, 1 + speedFactor));
}

function setRenderMatrix() {
  console.clear();

  matrixObjects.forEach((obj) => {
    obj.configRender();

    for (let i = 0; i < obj.height; i++) {
      for (let j = 0; j < obj.width; j++) {
        matrixRenderArray[obj.y + i][obj.x + j] = obj.renderArray[i][j];
      }
    }
  });

  process.stdout.write(setMatrixRenderText());
}

function deleteObjects() {
  matrixObjects.forEach((obj) => {
    if (obj.toDestroy) {
      matrixObjects = matrixObjects.filter((o) => o !== obj);
    }
  });
}

function setMatrixRenderText() {
  let resultText = "";

  for (let i = 0; i < consoleHeight; i++) {
    for (let j = 0; j < consoleWidth; j++) {
      resultText = resultText + matrixRenderArray[i][j];
    }
  }

  return resultText;
}

function buildMatrixRenderArray() {
  for (let i = 0; i < consoleHeight; i++) {
    matrixRenderArray[i] = [];
    for (let j = 0; j < consoleWidth; j++) {
      matrixRenderArray[i][j] = " ";
    }
  }
}

function resetMatrixRenderArray() {
  for (let i = 0; i < consoleHeight; i++) {
    for (let j = 0; j < consoleWidth; j++) {
      matrixRenderArray[i][j] = " ";
    }
  }
}

const readline = require("readline");

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
  if (str === "\u0003") {
    process.exit();
  }

  if (key.name === "left") {
    player.x -= 1;

    player.x = player.x < 0 ? consoleWidth - 1 : player.x;

    player.textSprite = "←";
  }

  if (key.name === "right") {
    player.x += 1;

    player.x = player.x > consoleWidth - 1 ? 0 : player.x;

    player.textSprite = "→";
  }

  if (key.name === "up") {
    player.y -= 1;

    player.y = player.y < 1 ? consoleHeight - 1 : player.y;

    player.textSprite = "↑";
  }

  if (key.name === "down") {
    player.y += 1;

    player.y = player.y > consoleHeight - 1 ? 0 : player.y;

    player.textSprite = "↓";
  }

  if (key.name === "space") {
    if (isLose || isGameFinished) {
      start();
    }
  }
});
