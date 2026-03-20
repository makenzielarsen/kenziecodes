let floorCanvas = null;
let floorContext = null;
let gameCanvas = null;
let gameContext = null;
let inPrePlay = true;
let inPlay = false;
let inputBuffer = {};

let size = 15;

let previousTime = null;
let timer = 30;
let second = 0;
let runTime = 0;
let score = 0;
let lives = 6;
let scoreSeconds = 0;
let winner = false;

let stopPopUp = false;

let frog = null;
let ladyFrog = null;
let ladyCaptured = false;
let frogsHome = [
  {
    x: 10,
    y: 10,
    width: 40,
    height: 18,
    occupado: false,
    alligatorHome: false,
    flyHome: false,
  },
  {
    x: 74.05,
    y: 10,
    width: 40,
    height: 18,
    occupado: false,
    alligatorHome: false,
    flyHome: false,
  },
  {
    x: 138,
    y: 10,
    width: 40,
    height: 18,
    occupado: false,
    alligatorHome: false,
    flyHome: false,
  },
  {
    x: 201.05,
    y: 10,
    width: 40,
    height: 18,
    occupado: false,
    alligatorHome: false,
    flyHome: false,
  },
  {
    x: 265,
    y: 10,
    width: 40,
    height: 18,
    occupado: false,
    alligatorHome: false,
    flyHome: false,
  },
];
let numberOfFrogsHome = 0;
let ladyOnTheMove = false;
let frames = 0;
let ladyFrames = 0;
let ladyPauseFrames = 0;
let threeTurtleFrame = 0;
let twoTurtlesFrame = 0;
let fakeLogFrame = 0;
let alligatorFrame = 0;
let alligatorClipLocation = { x: 0, y: 34 };
let alligatorDeployed = false;
let flyFrame = 0;
let flyDeployed = false;
let ladyAppearance = 0;

let yellowCars = [];
let tractorCars = [];
let pinkCars = [];
let whiteCars = [];
let bigRigs = [];
let threeTurtles = [];
let smallLogs = [];
let largeLogs = [];
let twoTurtles = [];
let mediumLogs = [];

let forwardKey = null;
let backwardKey = null;
let rightKey = null;
let leftKey = null;

let goopParticleSystem = null;
let confettiParticleSystem = null;

function backgroundSound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.setAttribute("loop", "true");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

let backgroundMusic = new backgroundSound("resources/Frogger.mp3");
let jumpSound = new sound("resources/jump.mp3");
let homeSound = new sound("resources/home.mp3");
let powerupSound = new sound("resources/powerup.mp3");
let deathSound = new sound("resources/dead.mp3");

function initialize() {
  floorCanvas = document.getElementById("floorCanvas");
  floorContext = floorCanvas.getContext("2d");
  gameCanvas = document.getElementById("gameCanvas");
  gameContext = gameCanvas.getContext("2d");
  previousTime = performance.now();

  renderFloor();

  frog = (function (imageSource, clipLocation, canvasLocation, direction) {
    this.image = new Image();
    image.isReady = false;
    image.onload = function () {
      this.isReady = true;
    };
    image.src = imageSource;

    this.clipLocation = clipLocation;
    this.canvasLocation = canvasLocation;
    return {
      clipLocation: clipLocation,
      canvasLocation: canvasLocation,
      direction: direction,
      moving: false,
      alive: true,
      deathByCar: false,
      image: image,
    };
  })(
    "resources/frog.png",
    { x: 0, y: 35.5 },
    {
      x: Math.floor(gameCanvas.width / 2 - 10),
      y: Math.floor(gameCanvas.height - 10),
    },
    "north"
  );

  ladyFrog = (function (imageSource, clipLocation, canvasLocation, direction) {
    this.image = new Image();
    image.isReady = false;
    image.onload = function () {
      this.isReady = true;
    };
    image.src = imageSource;

    this.clipLocation = clipLocation;
    this.canvasLocation = canvasLocation;
    return {
      clipLocation: clipLocation,
      canvasLocation: canvasLocation,
      direction: direction,
      active: false,
      image: image,
    };
  })(
    "resources/girlFrog.png",
    { x: 0, y: 0 },
    {
      x: Math.floor(gameCanvas.width / 2),
      y: Math.floor(gameCanvas.height / 2),
    },
    "east"
  );

  yellowCars = [
    { x: 10, y: gameCanvas.width / 2 - 20 },
    { x: 74.05, y: gameCanvas.width / 2 - 20 },
    { x: 138, y: gameCanvas.width / 2 - 20 },
    { x: 201.05, y: gameCanvas.width / 2 - 20 },
    { x: 245, y: gameCanvas.width / 2 - 20 },
  ];

  tractorCars = [
    { x: 0, y: gameCanvas.width / 2 - 30 },
    { x: 98, y: gameCanvas.width / 2 - 30 },
    { x: 145, y: gameCanvas.width / 2 - 30 },
  ];

  pinkCars = [
    { x: 15, y: gameCanvas.width / 2 - 40 },
    { x: 60, y: gameCanvas.width / 2 - 40 },
    { x: 158, y: gameCanvas.width / 2 - 40 },
    { x: 215, y: gameCanvas.width / 2 - 40 },
  ];

  whiteCars = [
    { x: 34, y: gameCanvas.width / 2 - 50 },
    { x: 82, y: gameCanvas.width / 2 - 50 },
    { x: 197, y: gameCanvas.width / 2 - 50 },
  ];

  bigRigs = [
    { x: 25, y: gameCanvas.width / 2 - 60 },
    { x: 200, y: gameCanvas.width / 2 - 60 },
  ];

  threeTurtles = [
    { x: 20.05, y: 70, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 35.05, y: 70, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 50.05, y: 70, clipLocation: { x: 0, y: 0 }, moving: false },
    {
      x: 80.05,
      y: 70,
      clipLocation: { x: 0, y: 0 },
      moving: true,
      under: false,
    },
    {
      x: 95.05,
      y: 70,
      clipLocation: { x: 0, y: 0 },
      moving: true,
      under: false,
    },
    {
      x: 110.05,
      y: 70,
      clipLocation: { x: 0, y: 0 },
      moving: true,
      under: false,
    },
    { x: 168, y: 70, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 183, y: 70, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 198, y: 70, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 265.05, y: 70, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 280.05, y: 70, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 295.05, y: 70, clipLocation: { x: 0, y: 0 }, moving: false },
  ];

  smallLogs = [
    { x: 10, y: 60 },
    { x: 115, y: 60 },
    { x: 260, y: 60 },
    { x: 340, y: 60 },
  ];

  largeLogs = [
    { x: 100, y: 50 },
    { x: 300, y: 50 },
  ];

  twoTurtles = [
    { x: 0, y: 40, clipLocation: { x: 0, y: 0 }, moving: true, under: false },
    { x: 15, y: 40, clipLocation: { x: 0, y: 0 }, moving: true, under: false },
    { x: 75, y: 40, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 90, y: 40, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 150, y: 40, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 165, y: 40, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 230, y: 40, clipLocation: { x: 0, y: 0 }, moving: false },
    { x: 245, y: 40, clipLocation: { x: 0, y: 0 }, moving: false },
  ];

  mediumLogs = [
    { x: -90, y: 30, alligator: true, clipLocation: { x: 0, y: 35.5 } },
    { x: 10, y: 30, alligator: false },
    { x: 150, y: 30, alligator: false },
    { x: 270, y: 30, alligator: false },
  ];

  let imageGoop = new Image();
  imageGoop.src = "resources/splat.png";

  goopParticleSystem = ParticleSystem(gameContext, {
    image: imageGoop,
    center: { x: frog.canvasLocation.x, y: frog.canvasLocation.y },
    size: { mean: 10, stdev: 3 },
    speed: { mean: 0, stdev: 0.2 },
    lifetime: { mean: 100, stdev: 250 },
  });

  let imageConfetti = new Image();
  imageConfetti.src = "resources/winConfetti.png";

  confettiParticleSystem = ParticleSystem(gameContext, {
    image: imageConfetti,
    center: { x: frog.canvasLocation.x, y: frog.canvasLocation.y },
    size: { mean: 10, stdev: 3 },
    speed: { mean: 0, stdev: 0.2 },
    lifetime: { mean: 100, stdev: 250 },
  });

  window.addEventListener("keydown", function (event) {
    inputBuffer[event.key] = event.keyCode;
  });

  if (getForwardKey() === null) {
    forwardKey = 38;
  } else {
    switch (JSON.parse(getForwardKey()).length) {
      case 1:
        forwardKey = JSON.parse(getForwardKey())[0];
        break;
      default:
        forwardKey = 38;
        break;
    }
  }
  if (getBackwardKey() === null) {
    backwardKey = 40;
  } else {
    switch (JSON.parse(getBackwardKey()).length) {
      case 1:
        backwardKey = JSON.parse(getBackwardKey())[0];
        break;
      default:
        backwardKey = 40;
        break;
    }
  }
  if (getRightKey() === null) {
    rightKey = 39;
  } else {
    switch (JSON.parse(getRightKey()).length) {
      case 1:
        rightKey = JSON.parse(getRightKey())[0];
        break;
      default:
        rightKey = 39;
        break;
    }
  }
  if (getLeftKey() === null) {
    leftKey = 37;
  } else {
    switch (JSON.parse(getLeftKey()).length) {
      case 1:
        leftKey = JSON.parse(getLeftKey())[0];
        break;
      default:
        leftKey = 37;
        break;
    }
  }

  window.addEventListener("resize", resizeCanvas);

  requestAnimationFrame(gameLoop);
}

function gameLoop(time) {
  let elapsedTime = time - previousTime;
  previousTime = time;

  processInput();

  update(elapsedTime);

  render();

  window.requestAnimationFrame(gameLoop);
}

function processInput() {
  if (inPrePlay || inPlay) {
    for (input in inputBuffer) {
      moveFrog(inputBuffer[input]);
    }
    inputBuffer = {};
  } else if (!inPlay) {
    return;
  }
}

function update(elapsedTime) {
  let scoreLabel = document.getElementById("score");
  let livesDiv = document.getElementById("lives");

  if (!inPlay && !inPrePlay) {
    while (livesDiv.firstChild) {
      livesDiv.removeChild(livesDiv.lastChild);
    }
    second = second + elapsedTime;
    if (second >= 100) {
      timer = timer - 0.1;
      let loadBar = document.getElementById("loadBar");
      loadBar.style.width = `${timer * 10}px`;
      second = 0;

      if (timer <= 0) {
        if (winner && !stopPopUp) {
          enterName();
        }
        backgroundMusic.stop();
        transitionFromGame();
      }
    }
    return;
  }

  if (!inPrePlay && inPlay && frog != null) {
    if (!frog.alive && frog.deathByCar) {
      goopParticleSystem.addExplosionParticles(frog.canvasLocation);
      goopParticleSystem.updateExplosionParticles(elapsedTime);
    }
  }

  confettiParticleSystem.updateExplosionParticles(elapsedTime);

  // Update Timer Label
  runTime = runTime + elapsedTime;
  second = second + elapsedTime;
  if (second >= 100) {
    timer = timer - 0.1;
    let loadBar = document.getElementById("loadBar");
    loadBar.style.width = `${timer * 10}px`;
    second = 0;

    if (timer <= 0) {
      killFrog();
    }
  }

  // Update Score Label
  scoreLabel.innerHTML = "Score: " + score;

  //Update Lives Label
  while (livesDiv.firstChild) {
    livesDiv.removeChild(livesDiv.lastChild);
  }
  for (let i = 0; i < lives; i++) {
    var frogImg = document.createElement("img");
    frogImg.setAttribute("src", "resources/logo.png");
    frogImg.setAttribute("height", "20");
    frogImg.setAttribute("alt", "Frog");
    livesDiv.appendChild(frogImg);
  }

  updateObstacles();
}

function updateObstacles() {
  for (car in yellowCars) {
    yellowCars[car].x = yellowCars[car].x - 0.5;
    if (yellowCars[car].x < -20) {
      yellowCars[car].x = gameCanvas.width + 10;
    }
    if (
      inRectangle(
        yellowCars[car].x,
        yellowCars[car].x + 15,
        yellowCars[car].y,
        yellowCars[car].y + 9,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        true
      )
    ) {
      frog.deathByCar = true;
      killFrog();
    }
  }
  for (car in tractorCars) {
    tractorCars[car].x = tractorCars[car].x + 0.3;
    if (tractorCars[car].x > gameCanvas.width + 20) {
      tractorCars[car].x = -15;
    }
    if (
      inRectangle(
        tractorCars[car].x,
        tractorCars[car].x + 15,
        tractorCars[car].y,
        tractorCars[car].y + 9,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        false
      )
    ) {
      frog.deathByCar = true;
      killFrog();
    }
  }
  for (car in pinkCars) {
    pinkCars[car].x = pinkCars[car].x - 0.7;
    if (pinkCars[car].x < -20) {
      pinkCars[car].x = gameCanvas.width + 10;
    }
    if (
      inRectangle(
        pinkCars[car].x,
        pinkCars[car].x + 15,
        pinkCars[car].y,
        pinkCars[car].y + 9,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        true
      )
    ) {
      frog.deathByCar = true;
      killFrog();
    }
  }
  for (car in whiteCars) {
    whiteCars[car].x = whiteCars[car].x + 0.6;
    if (whiteCars[car].x > gameCanvas.width + 20) {
      whiteCars[car].x = -15;
    }
    if (
      inRectangle(
        whiteCars[car].x,
        whiteCars[car].x + 15,
        whiteCars[car].y,
        whiteCars[car].y + 9,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        false
      )
    ) {
      frog.deathByCar = true;
      killFrog();
    }
  }
  for (car in bigRigs) {
    bigRigs[car].x = bigRigs[car].x - 0.2;
    if (bigRigs[car].x < -20) {
      bigRigs[car].x = gameCanvas.width + 10;
    }
    if (
      inRectangle(
        bigRigs[car].x,
        bigRigs[car].x + 15,
        bigRigs[car].y,
        bigRigs[car].y + 9,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        true
      )
    ) {
      frog.deathByCar = true;
      killFrog();
    }
  }
  let waterSafe = false;
  for (turtle in threeTurtles) {
    threeTurtles[turtle].x = threeTurtles[turtle].x - 0.6;
    if (threeTurtles[turtle].x < -20) {
      threeTurtles[turtle].x = gameCanvas.width + 10;
    }
    if (threeTurtles[turtle].moving) {
      if (threeTurtleFrame > 100) {
        threeTurtles[turtle].clipLocation.x =
          threeTurtles[turtle].clipLocation.x + 41;
        if (threeTurtles[turtle].clipLocation.x >= 205) {
          threeTurtles[turtle].clipLocation.x = 0;
          threeTurtles[turtle].under = false;
        }
        if (threeTurtles[turtle].clipLocation.x == 164) {
          threeTurtles[turtle].under = true;
        }
        threeTurtleFrame = 0;
      }
      threeTurtleFrame = threeTurtleFrame + 1;
    }
    if (
      inRectangle(
        threeTurtles[turtle].x,
        threeTurtles[turtle].x + 15,
        threeTurtles[turtle].y,
        threeTurtles[turtle].y + 9,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        true
      )
    ) {
      if (threeTurtles[turtle].under) {
        killFrog();
      }
      frog.canvasLocation.x = frog.canvasLocation.x - 0.6;
      waterSafe = true;
      if (frog.canvasLocation.x < 0) {
        killFrog();
      }
    }
  }
  if (ladyFrog.active) {
    ladyFrog.canvasLocation.x = ladyFrog.canvasLocation.x + 0.2;
    ladyOnTheMove = true;
    if (ladyPauseFrames > 10) {
      if (ladyFrog.direction == "west") {
        ladyFrog.canvasLocation.x = ladyFrog.canvasLocation.x - 5;
      } else if (ladyFrog.direction == "east") {
        ladyFrog.canvasLocation.x = ladyFrog.canvasLocation.x + 5;
      }
    }
  }
  for (log in smallLogs) {
    smallLogs[log].x = smallLogs[log].x + 0.2;
    if (smallLogs[log].x > gameCanvas.width + 45) {
      smallLogs[log].x = -40;
      ladyAppearance = ladyAppearance + 1;
      if (ladyAppearance > 5) {
        ladyFrog.active = true;
        ladyFrog.canvasLocation = { x: smallLogs[log].x, y: smallLogs[log].y };
        ladyAppearance = 0;
      }
    }
    if (
      inRectangle(
        smallLogs[log].x,
        smallLogs[log].x + 44,
        smallLogs[log].y,
        smallLogs[log].y + 9,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        true
      )
    ) {
      frog.canvasLocation.x = frog.canvasLocation.x + 0.2;
      waterSafe = true;
      if (frog.canvasLocation.x > gameCanvas.width) {
        killFrog();
      }
    }
  }
  for (log in largeLogs) {
    largeLogs[log].x = largeLogs[log].x + 0.3;
    if (largeLogs[log].x > gameCanvas.width + 90) {
      largeLogs[log].x = -85;
    }
    if (
      inRectangle(
        largeLogs[log].x,
        largeLogs[log].x + 89,
        largeLogs[log].y,
        largeLogs[log].y + 9,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        true
      )
    ) {
      frog.canvasLocation.x = frog.canvasLocation.x + 0.3;
      waterSafe = true;
      if (frog.canvasLocation.x > gameCanvas.width) {
        killFrog();
      }
    }
  }
  for (turtle in twoTurtles) {
    twoTurtles[turtle].x = twoTurtles[turtle].x - 0.3;
    if (twoTurtles[turtle].x < -20) {
      twoTurtles[turtle].x = gameCanvas.width + 10;
    }
    if (twoTurtles[turtle].moving) {
      if (twoTurtlesFrame > 100) {
        twoTurtles[turtle].clipLocation.x =
          twoTurtles[turtle].clipLocation.x + 41;
        if (twoTurtles[turtle].clipLocation.x >= 205) {
          twoTurtles[turtle].clipLocation.x = 0;
          twoTurtles[turtle].under = false;
        }
        if (twoTurtles[turtle].clipLocation.x == 164) {
          twoTurtles[turtle].under = true;
        }
        twoTurtlesFrame = 0;
      }
      twoTurtlesFrame = twoTurtlesFrame + 1;
    }
    if (
      inRectangle(
        twoTurtles[turtle].x,
        twoTurtles[turtle].x + 19,
        twoTurtles[turtle].y,
        twoTurtles[turtle].y + 9,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        true
      )
    ) {
      if (twoTurtles[turtle].under) {
        killFrog();
      }
      frog.canvasLocation.x = frog.canvasLocation.x - 0.3;
      waterSafe = true;
      if (frog.canvasLocation.x < 0) {
        killFrog();
      }
    }
  }
  for (log in mediumLogs) {
    if (mediumLogs[log].alligator) {
      fakeLogFrame = fakeLogFrame + 1;
      if (fakeLogFrame > 100) {
        mediumLogs[log].clipLocation.y = 2;
      }
      if (fakeLogFrame > 200) {
        fakeLogFrame = 0;
        mediumLogs[log].clipLocation.y = 35.5;
      }
    }
    mediumLogs[log].x = mediumLogs[log].x + 0.4;
    if (mediumLogs[log].x > gameCanvas.width + 80) {
      mediumLogs[log].x = -75;
    }
    if (
      inRectangle(
        mediumLogs[log].x,
        mediumLogs[log].x + 79,
        mediumLogs[log].y,
        mediumLogs[log].y + 9,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        true
      )
    ) {
      if (mediumLogs[log].alligator) {
        if (mediumLogs[log].clipLocation.y == 2) {
          killFrog();
        }
      }
      frog.canvasLocation.x = frog.canvasLocation.x + 0.4;
      waterSafe = true;
      if (frog.canvasLocation.x > gameCanvas.width) {
        killFrog();
      }
    }
  }
  if (
    frog.canvasLocation.y <= Math.floor(gameCanvas.height / 2 - 5) &&
    frog.canvasLocation.y >= 25 &&
    !waterSafe
  ) {
    killFrog();
  }
  if (alligatorDeployed) {
    if (alligatorFrame > 100) {
      alligatorClipLocation.y = 0;
    }
    if (alligatorFrame > 200) {
      alligatorFrame = 0;
      for (home in frogsHome) {
        frogsHome[home].alligatorHome = false;
        alligatorClipLocation.y = 34;
        alligatorDeployed = false;
      }
    }
  } else if (flyDeployed) {
    flyFrame = flyFrame + 1;
    if (flyFrame > 500) {
      flyFrame = 0;
      for (home in frogsHome) {
        frogsHome[home].flyHome = false;
        flyDeployed = false;
      }
    }
  } else {
    if (alligatorFrame >= 200) {
      if (
        numberOfFrogsHome != 5 &&
        alligatorDeployed == false &&
        flyDeployed == false
      ) {
        let randomChoiceNumber = Math.floor(Math.random() * 3);
        let randomHouseNumber = Math.floor(Math.random() * 5);
        if (randomChoiceNumber == 1) {
          while (frogsHome[randomHouseNumber].occupado) {
            randomHouseNumber = Math.floor(Math.random() * 4);
          }
          frogsHome[randomHouseNumber].alligatorHome = true;
          alligatorDeployed = true;
          alligatorFrame = 0;
        } else if (randomChoiceNumber == 2) {
          while (frogsHome[randomHouseNumber].occupado) {
            randomHouseNumber = Math.floor(Math.random() * 4);
          }
          frogsHome[randomHouseNumber].flyHome = true;
          flyDeployed = true;
        }
      }
    }
  }
  alligatorFrame = alligatorFrame + 1;
}

function render() {
  if (inPrePlay) {
    this.title = new Image();
    title.isReady = false;
    title.onload = function () {
      this.isReady = true;
    };
    title.src = "resources/frogger.png";
    gameContext.drawImage(
      title,
      51,
      floorCanvas.height / 4,
      floorCanvas.width - 100,
      20
    );
    this.coin = new Image();
    coin.isReady = false;
    coin.onload = function () {
      this.isReady = true;
    };
    coin.src = "resources/insertCoin.png";
    gameContext.drawImage(
      coin,
      50,
      floorCanvas.height / 2 - 5,
      floorCanvas.width - 100,
      20
    );
    return;
  } else if (!inPlay) {
    return;
  }
  gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  renderFrogHomes();
  renderObstacles();
  renderFrog();
  renderLady();
}

function renderFrog() {
  if (frog.alive) {
    if (!frog.moving) {
      gameContext.drawImage(
        frog.image,
        frog.clipLocation.x,
        frog.clipLocation.y,
        34.5,
        35.5,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        17,
        12
      );
    } else {
      gameContext.drawImage(
        frog.image,
        frog.clipLocation.x + 34.5,
        frog.clipLocation.y,
        34.5,
        35.5,
        frog.canvasLocation.x,
        frog.canvasLocation.y,
        17,
        12
      );
      frames = frames + 1;
      if (frames > 10) {
        frog.moving = false;
        if (frog.direction == "north") {
          frog.canvasLocation.y = frog.canvasLocation.y - 5;
        } else if (frog.direction == "south") {
          frog.canvasLocation.y = frog.canvasLocation.y + 5;
        } else if (frog.direction == "west") {
          frog.canvasLocation.x = frog.canvasLocation.x - 5;
        } else if (frog.direction == "east") {
          frog.canvasLocation.x = frog.canvasLocation.x + 5;
        }
        frames = 0;
      }
    }
  } else {
    if (frog.deathByCar) {
      goopParticleSystem.renderExplosion();
    }
    this.image = new Image();
    image.isReady = false;
    image.onload = function () {
      this.isReady = true;
    };
    image.src = "resources/dead.png";
    gameContext.drawImage(
      image,
      frog.canvasLocation.x,
      frog.canvasLocation.y,
      17,
      12
    );
    frames = frames + 1;
    if (frames > 10) {
      frog.alive = true;
      frog.canvasLocation = {
        x: Math.floor(gameCanvas.width / 2 - 10),
        y: Math.floor(gameCanvas.height - 10),
      };
      frames = 0;
      timer = 30;
    }
  }
}

function renderLady() {
  if (ladyCaptured) {
    gameContext.drawImage(
      ladyFrog.image,
      ladyFrog.clipLocation.x,
      ladyFrog.clipLocation.y,
      37,
      37.5,
      frog.canvasLocation.x,
      frog.canvasLocation.y,
      17,
      12
    );
    return;
  }
  if (ladyFrog.active) {
    if (!ladyOnTheMove || ladyPauseFrames < 10) {
      gameContext.drawImage(
        ladyFrog.image,
        ladyFrog.clipLocation.x,
        ladyFrog.clipLocation.y,
        37,
        37.5,
        ladyFrog.canvasLocation.x,
        ladyFrog.canvasLocation.y,
        17,
        12
      );
      ladyPauseFrames = ladyPauseFrames + 1;
    } else {
      ladyPauseFrames = 0;
      gameContext.drawImage(
        ladyFrog.image,
        ladyFrog.clipLocation.x + 37.5,
        ladyFrog.clipLocation.y,
        37,
        37.5,
        ladyFrog.canvasLocation.x,
        ladyFrog.canvasLocation.y,
        17,
        12
      );
      ladyFrames = ladyFrames + 1;
      if (ladyFrames > 10) {
        ladyOnTheMove = false;
        if (ladyFrog.direction == "west") {
          ladyFrog.canvasLocation.x = ladyFrog.canvasLocation.x - 5;
          ladyFrog.clipLocation = { x: 74.5, y: 0 };
          ladyFrog.direction = "east";
        } else if (ladyFrog.direction == "east") {
          ladyFrog.canvasLocation.x = ladyFrog.canvasLocation.x + 5;
          ladyFrog.clipLocation = { x: 0, y: 0 };
          ladyFrog.direction = "west";
        }
        ladyFrames = 0;
      }
    }
  }
}

function renderFrogHomes() {
  let image = new Image();
  image.isReady = false;
  image.onload = function () {
    this.isReady = true;
  };
  for (frogHome in frogsHome) {
    // gameContext.beginPath();
    // gameContext.rect(
    //   frogsHome[frogHome].x,
    //   frogsHome[frogHome].y,
    //   frogsHome[frogHome].width,
    //   frogsHome[frogHome].height
    // );
    // gameContext.stroke();
    if (frogsHome[frogHome].occupado) {
      confettiParticleSystem.renderExplosion();
      image.src = "resources/frogHome.png";
      gameContext.drawImage(
        image,
        frogsHome[frogHome].x,
        frogsHome[frogHome].y,
        21,
        18
      );
    } else if (frogsHome[frogHome].alligatorHome) {
      image.src = "resources/alligatorFace.png";
      gameContext.drawImage(
        image,
        alligatorClipLocation.x,
        alligatorClipLocation.y,
        29,
        34,
        frogsHome[frogHome].x,
        frogsHome[frogHome].y,
        21,
        18
      );
    } else if (frogsHome[frogHome].flyHome) {
      image.src = "resources/fly.png";
      gameContext.drawImage(
        image,
        frogsHome[frogHome].x,
        frogsHome[frogHome].y,
        21,
        18
      );
    }
  }
}

function renderObstacles() {
  renderYellowCars();
  renderTractorCars();
  renderPinkCars();
  renderWhiteCars();
  renderBigRigs();
  renderThreeTurtles();
  renderSmallLogs();
  renderLargeLogs();
  renderTwoTurtles();
  renderMediumLogs();
}

function renderYellowCars() {
  let image = new Image();
  image.isReady = false;
  image.onload = function () {
    this.isReady = true;
  };
  image.src = "resources/yellowCar.png";
  for (car in yellowCars) {
    gameContext.drawImage(image, yellowCars[car].x, yellowCars[car].y, 20, 10);
  }
}

function renderTractorCars() {
  let image = new Image();
  image.isReady = false;
  image.onload = function () {
    this.isReady = true;
  };
  image.src = "resources/tractor.png";
  for (car in tractorCars) {
    gameContext.drawImage(
      image,
      tractorCars[car].x,
      tractorCars[car].y,
      20,
      10
    );
  }
}

function renderPinkCars() {
  let image = new Image();
  image.isReady = false;
  image.onload = function () {
    this.isReady = true;
  };
  image.src = "resources/pinkCar.png";
  for (car in pinkCars) {
    gameContext.drawImage(image, pinkCars[car].x, pinkCars[car].y, 20, 10);
  }
}

function renderWhiteCars() {
  let image = new Image();
  image.isReady = false;
  image.onload = function () {
    this.isReady = true;
  };
  image.src = "resources/whiteCar.png";
  for (car in whiteCars) {
    gameContext.drawImage(image, whiteCars[car].x, whiteCars[car].y, 20, 10);
  }
}

function renderBigRigs() {
  let image = new Image();
  image.isReady = false;
  image.onload = function () {
    this.isReady = true;
  };
  image.src = "resources/bigRig.png";
  for (car in bigRigs) {
    gameContext.drawImage(image, bigRigs[car].x, bigRigs[car].y, 20, 10);
  }
}

function renderThreeTurtles() {
  let image = new Image();
  image.isReady = false;
  image.onload = function () {
    this.isReady = true;
  };
  image.src = "resources/turtle.png";
  for (turtle in threeTurtles) {
    gameContext.drawImage(
      image,
      threeTurtles[turtle].clipLocation.x,
      threeTurtles[turtle].clipLocation.y,
      41,
      44,
      threeTurtles[turtle].x,
      threeTurtles[turtle].y,
      20,
      10
    );
  }
}

function renderSmallLogs() {
  let image = new Image();
  image.isReady = false;
  image.onload = function () {
    this.isReady = true;
  };
  image.src = "resources/smallLog.png";
  for (log in smallLogs) {
    gameContext.drawImage(image, smallLogs[log].x, smallLogs[log].y, 45, 10);
  }
}

function renderLargeLogs() {
  let image = new Image();
  image.isReady = false;
  image.onload = function () {
    this.isReady = true;
  };
  image.src = "resources/largeLog.png";
  for (log in largeLogs) {
    gameContext.drawImage(image, largeLogs[log].x, largeLogs[log].y, 90, 10);
  }
}

function renderTwoTurtles() {
  let image = new Image();
  image.isReady = false;
  image.onload = function () {
    this.isReady = true;
  };
  image.src = "resources/turtle.png";
  for (turtle in twoTurtles) {
    gameContext.drawImage(
      image,
      twoTurtles[turtle].clipLocation.x,
      twoTurtles[turtle].clipLocation.y,
      41,
      44,
      twoTurtles[turtle].x,
      twoTurtles[turtle].y,
      20,
      10
    );
  }
}

function renderMediumLogs() {
  for (log in mediumLogs) {
    let image = new Image();
    image.isReady = false;
    image.onload = function () {
      this.isReady = true;
    };
    if (mediumLogs[log].alligator) {
      image.src = "resources/alligator.png";
      gameContext.drawImage(
        image,
        mediumLogs[log].clipLocation.x,
        mediumLogs[log].clipLocation.y,
        98,
        35.5,
        mediumLogs[log].x,
        mediumLogs[log].y,
        80,
        12
      );
    } else {
      image.src = "resources/mediumLog.png";
      gameContext.drawImage(
        image,
        mediumLogs[log].x,
        mediumLogs[log].y,
        80,
        10
      );
    }
  }
}

function renderFloor() {
  floorContext.fillStyle = "#000080";
  floorContext.fillRect(0, 0, floorCanvas.width, floorCanvas.height / 2 + 5);
  floorContext.fillStyle = "#000000";
  floorContext.fillRect(
    0,
    floorCanvas.height / 2 + 5,
    floorCanvas.width,
    floorCanvas.height / 2
  );

  if (!inPrePlay) {
    let topBorder = new Image();
    topBorder.isReady = false;
    topBorder.onload = function () {
      this.isReady = true;
    };
    topBorder.src = "./resources/topBorder.png";
    floorContext.drawImage(topBorder, 0, 0, floorCanvas.width, 30);

    let otherBorders = new Image();
    otherBorders.isReady = false;
    otherBorders.onload = function () {
      this.isReady = true;
    };
    otherBorders.src = "./resources/middleBorder.png";
    floorContext.drawImage(
      otherBorders,
      0,
      floorCanvas.height / 2 + 5,
      floorCanvas.width,
      10
    );
    floorContext.drawImage(
      otherBorders,
      0,
      floorCanvas.height - 10,
      floorCanvas.width,
      10
    );
  }
}

function inRectangle(x1, x2, y1, y2, x, y, headingLeft) {
  if (headingLeft) {
    if (x >= x1 - 10 && x <= x2 - 10 && y >= y1 && y <= y2) {
      return true;
    }
  } else {
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      return true;
    }
  }
  return false;
}

function enterName() {
  var person = prompt("Please enter your first name", "Harry");

  if (person == null || person == "") {
    window.location.href = "index.html";
  } else {
    addValue(score, person);
    stopPopUp = true;
  }
}

function pullUpQuitOptions() {
  if (confirm("Quit game?")) {
    window.location.href = "index.html";
  }
}

function moveFrog(key) {
  if (inPrePlay) {
    inPrePlay = false;
    inPlay = true;
    renderFloor();
    backgroundMusic.play();
    return;
  }
  if (key == 27) {
    pullUpQuitOptions();
  } else if (key == forwardKey) {
    if (frog.direction != "north") {
      frog.direction = "north";
    }
    frog.canvasLocation.y = frog.canvasLocation.y - 5;
    frog.clipLocation.x = 0;
    frog.clipLocation.y = 35.5;
    frog.moving = true;
    score = score + 10;
    jumpSound.play();
  } else if (key == backwardKey) {
    if (frog.direction != "south") {
      frog.direction = "south";
    }
    frog.canvasLocation.y = frog.canvasLocation.y + 5;
    frog.clipLocation.x = 69;
    frog.clipLocation.y = 35.5;
    frog.moving = true;
    jumpSound.play();
  } else if (key == leftKey) {
    if (frog.direction != "west") {
      frog.direction = "west";
    }
    frog.canvasLocation.x = frog.canvasLocation.x - 5;
    frog.clipLocation.x = 69;
    frog.clipLocation.y = 0;
    frog.moving = true;
    jumpSound.play();
  } else if (key == rightKey) {
    if (frog.direction != "east") {
      frog.direction = "east";
    }
    frog.canvasLocation.x = frog.canvasLocation.x + 5;
    frog.clipLocation.x = 0;
    frog.clipLocation.y = 0;
    frog.moving = true;
    jumpSound.play();
  }
  if (ladyFrog.active) {
    let difference = Math.abs(
      frog.canvasLocation.x - ladyFrog.canvasLocation.x
    );
    if (
      difference <= 10 &&
      frog.canvasLocation.y == ladyFrog.canvasLocation.y
    ) {
      ladyCaptured = true;
      powerupSound.play();
    }
  }
  if (
    (frog.canvasLocation.x >= Math.floor(gameCanvas.width / 2 - 20) &&
      frog.canvasLocation.x <= Math.floor(gameCanvas.width / 2) &&
      frog.canvasLocation.y <= 30) ||
    (frog.canvasLocation.x >= Math.floor(gameCanvas.width / 2 - 78) &&
      frog.canvasLocation.x <= Math.floor(gameCanvas.width / 2 - 68) &&
      frog.canvasLocation.y <= 30) ||
    (frog.canvasLocation.x >= Math.floor(gameCanvas.width / 2 - 147) &&
      frog.canvasLocation.x <= Math.floor(gameCanvas.width / 2 - 137) &&
      frog.canvasLocation.y <= 30) ||
    (frog.canvasLocation.x >= Math.floor(gameCanvas.width / 2 + 53) &&
      frog.canvasLocation.x <= Math.floor(gameCanvas.width / 2 + 63) &&
      frog.canvasLocation.y <= 30) ||
    (frog.canvasLocation.x >= Math.floor(gameCanvas.width / 2 + 113) &&
      frog.canvasLocation.x <= Math.floor(gameCanvas.width / 2 + 123) &&
      frog.canvasLocation.y <= 30)
  ) {
    winnerwinnerChickenDinner({
      x: frog.canvasLocation.x,
      y: frog.canvasLocation.y,
    });
  }
}

function winnerwinnerChickenDinner(location) {
  if (!inPlay) {
    return;
  }
  for (home in frogsHome) {
    if (
      location.x > frogsHome[home].x &&
      location.x < frogsHome[home].x + frogsHome[home].width &&
      location.y > frogsHome[home].y &&
      location.y < frogsHome[home].y + frogsHome[home].height
    ) {
      if (frogsHome[home].alligatorHome) {
        killFrog();
      } else if (frogsHome[home].flyHome) {
        score = score + 200;
      }
      confettiParticleSystem.addSquareExplosionParticles(
        {
          x: frogsHome[home].x,
          y: frogsHome[home].y,
        },
        frogsHome[home].width
      );
      homeSound.play();
      frogsHome[home].occupado = true;
      numberOfFrogsHome = numberOfFrogsHome + 1;
      scoreSeconds = Math.floor(timer) * 2;
      timer = 30;
      score = score + 50 + scoreSeconds * 10;
      if (ladyCaptured) {
        ladyCaptured = false;
        score = score + 200;
      }
      frog.canvasLocation = {
        x: Math.floor(gameCanvas.width / 2 - 10),
        y: Math.floor(gameCanvas.height - 10),
      };
      frog.moving = false;
      inputBuffer = {};
      if (numberOfFrogsHome == 5) {
        gameOver(true);
      }
    }
  }
}

function resizeCanvas() {
  floorCanvas.height = window.innerHeight / 2;
  floorCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight / 2;
  gameCanvas.width = window.innerWidth;
}

function gameOver(win) {
  inPlay = false;
  winner = win;
  timer = 3;
  if (win) {
    score = score + 1000;
  }
}

function killFrog() {
  if (frog.alive) {
    lives = lives - 1;
    deathSound.play();
    frog.alive = false;
    frog.moving = false;
    frog.deathByCar = false;
    inputBuffer = {};
    ladyCaptured = false;
    ladyFrog.active = false;
    if (lives == 0) {
      gameOver(false);
    }
  }
}