let menuDiv = document.getElementById("menuDiv");
let gameDiv = document.getElementById("gameDiv");
let scoresDiv = document.getElementById("scoresDiv");
let controlsDiv = document.getElementById("controlsDiv");
let creditsDiv = document.getElementById("creditsDiv");

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
let cursedMusic = new sound("resources/CursedFrogger.mp3");

function displayGame() {
  menuDiv.style.display = "none";
  gameDiv.style.display = "flex";
  initialize();
}

function displayHighScores() {
  menuDiv.style.display = "none";
  scoresDiv.style.display = "flex";
  Frogger.persistence.reportHighScores();
}

function transitionFromGame() {
  gameDiv.style.display = "none";
  scoresDiv.style.display = "flex";
  Frogger.persistence.reportHighScores();
}

function displayCustomizeControls() {
  menuDiv.style.display = "none";
  controlsDiv.style.display = "flex";
  initializeControls();
}

function displayCredits() {
  menuDiv.style.display = "none";
  creditsDiv.style.display = "flex";
  cursedMusic.play();
}