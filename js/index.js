let canvas = null;
let context = null;
let previousTime = performance.now();

function initialize() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  requestAnimationFrame(gameLoop);
}

function gameLoop(time) {
  let elapsedTime = time - previousTime;
  previousTime = time;
  update(elapsedTime);

  render();

  window.requestAnimationFrame(gameLoop);
}

function update(elapsedTime) {}

function render() {
  // context.drawImage(
  //   ship,
  //   2 * subImageWidth,
  //   0,
  //   subImageWidth,
  //   ship.height,
  //   startX,
  //   startY,
  //   sizeX,
  //   sizeY
  // );
}
