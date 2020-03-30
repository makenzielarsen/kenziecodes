function meToFrom() {
  document.getElementById("aboutMeDiv").style.display = "none";
  document.getElementById("fromDiv").style.display = "flex";
}

function fromToUSU() {
  document.getElementById("fromDiv").style.display = "none";
  document.getElementById("usuDiv").style.display = "flex";
}

function USUToMajors() {
  document.getElementById("usuDiv").style.display = "none";
  document.getElementById("majorsDiv").style.display = "flex";
}

function majorsToMe() {
  document.getElementById("majorsDiv").style.display = "none";
  document.getElementById("aboutMeDiv").style.display = "flex";
}
