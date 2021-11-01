let FallingText = require("./matrix-objects/FallingText.js");

let isMatrixRunning = true;
let matrixObjects = [];
let framesPerSecond = 15;
let matrixRenderArray = [];

let started = true;

let consoleWidth = 0;
let consoleHeight = 0;

start();

function start() {
  console.clear();

  setConsoleSize();

  createObjects();

  buildMatrixRenderArray();

  matrixLoop();
}

function createObjects() {
  matrixObjects.push(new FallingText(0, consoleHeight - 4, 4, 5));
}

function setConsoleSize() {
  consoleWidth = process.stdout.columns || 10;
  consoleHeight = process.stdout.rows || 10;
}

async function matrixLoop() {
  setConsoleSize();

  if (!started) {
    return;
  }

  deleteObjects();
  addRandomObjects();

  resetMatrixRenderArray();
  renderMatrix();

  await setTimeout(
    isMatrixRunning ? matrixLoop : false,
    (1 / framesPerSecond) * 1000
  );
}

function renderMatrix() {
  console.clear();

  matrixObjects.forEach((obj) => {
    obj.configRender();

    for (let i = 0; i < obj.height; i++) {
      matrixRenderArray[obj.y + i][obj.x] = obj.renderArray[i];
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

function addRandomObjects() {
  for (let i = 0; i < 10; i++) {
    if (Math.random() > 0.5) {
      let height = Math.round((Math.random() * consoleHeight) / 1.5);
      let x = Math.round(Math.random() * consoleWidth - 2);
      let y = Math.round(Math.random() * consoleHeight) - height - 1;

      y = y < 0 ? 0 : y;

      matrixObjects.push(new FallingText(0, height, x, y));
    }
  }
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
