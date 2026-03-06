let Frogger = {
  persistence: (function () {
    "use strict";
    let highScores = {};
    let previousScores = localStorage.getItem("Frogger.highScores");
    let forwardKey = localStorage.getItem("Frogger.forwardKey");
    let backwardKey = localStorage.getItem("Frogger.backwardKey");
    let rightKey = localStorage.getItem("Frogger.rightKey");
    let leftKey = localStorage.getItem("Frogger.leftKey");

    if (previousScores !== null) {
      highScores = JSON.parse(previousScores);
    }

    function addHighScore(score, name) {
      highScores[score] = name;
      localStorage["Frogger.highScores"] = JSON.stringify(highScores);
    }

    function removeHighScore(score) {
      delete highScores[score];
      localStorage["Frogger.highScores"] = JSON.stringify(highScores);
    }

    function reportHighScores() {
      let playersDiv = document.getElementById("players");
      let scoresDiv = document.getElementById("scores");
      if (playersDiv != null && scoresDiv != null) {
        playersDiv.innerHTML = "";
        scoresDiv.innerHTML = "";
        var orderedArray = [];

        //key === score
        for (var score in highScores) {
          orderedArray.push({ score: score, name: highScores[score] });
        }

        orderedArray.sort((a, b) => a.score - b.score);

        let tooLarge = orderedArray.length > 5;
        if (tooLarge) {
          orderedArray.splice(0, orderedArray.length - 5);
        }

        for (let i = 0; i < orderedArray.length; i++) {
          playersDiv.innerHTML += orderedArray[i].name + "<br/>";
          scoresDiv.innerHTML += orderedArray[i].score + "<br />";
        }
      }
    }

    function setForwardKey(keyName) {
      forwardKey = keyName;
      localStorage["Frogger.forwardKey"] = JSON.stringify(forwardKey);
    }

    function getForwardKey() {
      return forwardKey;
    }

    function setBackwardKey(keyName) {
      backwardKey = keyName;
      localStorage["Frogger.backwardKey"] = JSON.stringify(backwardKey);
    }

    function getBackwardKey() {
      return backwardKey;
    }

    function setRightKey(keyName) {
      rightKey = keyName;
      localStorage["Frogger.rightKey"] = JSON.stringify(rightKey);
    }

    function getRightKey() {
      return rightKey;
    }

    function setLeftKey(keyName) {
      leftKey = keyName;
      localStorage["Frogger.leftKey"] = JSON.stringify(leftKey);
    }

    function getLeftKey() {
      return leftKey;
    }

    return {
      addHighScore: addHighScore,
      removeHighScore: removeHighScore,
      reportHighScores: reportHighScores,
      setForwardKey: setForwardKey,
      getForwardKey: getForwardKey,
      setBackwardKey: setBackwardKey,
      getBackwardKey: getBackwardKey,
      setRightKey: setRightKey,
      getRightKey: getRightKey,
      setLeftKey: setLeftKey,
      getLeftKey: getLeftKey,
    };
  })(),
};

function addValue(score, name) {
  "use strict";

  Frogger.persistence.addHighScore(score, name);

  Frogger.persistence.reportHighScores();
}

function removeValue(key) {
  "use strict";

  Frogger.persistence.remove(key);
  Frogger.persistence.reportHighScores();
}

function setForwardKey(keyName) {
  Frogger.persistence.setForwardKey(keyName);
}

function getForwardKey() {
  return Frogger.persistence.getForwardKey();
}

function setBackwardKey(keyName) {
  Frogger.persistence.setBackwardKey(keyName);
}

function getBackwardKey() {
  return Frogger.persistence.getBackwardKey();
}

function setRightKey(keyName) {
  Frogger.persistence.setRightKey(keyName);
}

function getRightKey() {
  return Frogger.persistence.getRightKey();
}

function setLeftKey(keyName) {
  Frogger.persistence.setLeftKey(keyName);
}

function getLeftKey() {
  return Frogger.persistence.getLeftKey();
}

Frogger.persistence.reportHighScores();