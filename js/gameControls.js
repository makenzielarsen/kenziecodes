let forwardKeyInputOpened = false;
let forwardKeyPattern = [];
let backwardKeyInputOpened = false;
let backwardKeyPattern = [];
let rightKeyInputOpened = false;
let rightKeyPattern = [];
let leftKeyInputOpened = false;
let leftKeyPattern = [];

function keyCodeToName(keyCode) {
  switch (keyCode) {
    case 8:
      return "Backspace";
    case 9:
      return "Tab";
    case 13:
      return "Enter";
    case 16:
      return "Shift";
    case 17:
      return "Control";
    case 18:
      return "Alt";
    case 19:
      return "Pause/Break";
    case 20:
      return "Caps Lock";
    case 33:
      return "Page Up";
    case 32:
      return "Space";
    case 34:
      return "Page Down";
    case 35:
      return "End";
    case 36:
      return "Home";
    case 37:
      return "Arrow Left";
    case 38:
      return "Arrow Up";
    case 39:
      return "Arrow Right";
    case 40:
      return "Arrow Down";
    case 44:
      return "Print Screen";
    case 45:
      return "Insert";
    case 46:
      return "Delete";
    case 48:
      return "0";
    case 49:
      return "1";
    case 50:
      return "2";
    case 51:
      return "3";
    case 52:
      return "4";
    case 53:
      return "5";
    case 54:
      return "6";
    case 55:
      return "7";
    case 56:
      return "8";
    case 57:
      return "9";
    case 65:
      return "A";
    case 66:
      return "B";
    case 67:
      return "C";
    case 68:
      return "D";
    case 69:
      return "E";
    case 70:
      return "F";
    case 71:
      return "G";
    case 72:
      return "H";
    case 73:
      return "I";
    case 74:
      return "J";
    case 75:
      return "K";
    case 76:
      return "L";
    case 77:
      return "M";
    case 78:
      return "N";
    case 79:
      return "O";
    case 80:
      return "P";
    case 81:
      return "Q";
    case 82:
      return "R";
    case 83:
      return "S";
    case 84:
      return "T";
    case 85:
      return "U";
    case 86:
      return "V";
    case 87:
      return "W";
    case 88:
      return "X";
    case 89:
      return "Y";
    case 90:
      return "Z";
    case 91:
      return "Left Window Key";
    case 92:
      return "Right Window Key";
    case 93:
      return "Select Key";
    case 96:
      return "Numpad 0";
    case 97:
      return "Numpad 1";
    case 98:
      return "Numpad 2";
    case 99:
      return "Numpad 3";
    case 100:
      return "Numpad 4";
    case 101:
      return "Numpad 5";
    case 102:
      return "Numpad 6";
    case 103:
      return "Numpad 7";
    case 104:
      return "Numpad 8";
    case 105:
      return "Numpad 9";
    case 106:
      return "Multiply";
    case 107:
      return "Add";
    case 109:
      return "Subtract";
    case 110:
      return "Decimal Point";
    case 111:
      return "Divide";
    case 112:
      return "f1";
    case 113:
      return "f2";
    case 114:
      return "f3";
    case 115:
      return "f4";
    case 116:
      return "f5";
    case 117:
      return "f6";
    case 118:
      return "f7";
    case 119:
      return "f8";
    case 120:
      return "f9";
    case 121:
      return "f10";
    case 122:
      return "f11";
    case 123:
      return "f23";
    case 144:
      return "Num Lock";
    case 145:
      return "Scroll Lock";
    case 186:
      return "Semi-Colon";
    case 187:
      return "Equal sign";
    case 188:
      return "Comma";
    case 189:
      return "Dash";
    case 190:
      return "Period";
    case 191:
      return "Forward Slash";
    case 219:
      return "Open Braket";
    case 220:
      return "Back Slash";
    case 221:
      return "Close Braket";
    case 222:
      return "Single Quote";
  }
  return "Key Code: " + keyCode;
}

function keyCodesToUnifiedName(keys) {
  let string = "";
  keys = JSON.parse(keys);
  for (key in keys) {
    let newName = keyCodeToName(keys[key]);
    string = string + newName;
    if (key < keys.length - 1) {
      string = string + "+";
    }
  }
  return string;
}

function newKeyCodesToUnifiedName(keys) {
  let string = "";
  for (key in keys) {
    let newName = keyCodeToName(keys[key]);
    string = string + newName;
    if (key < keys.length - 1) {
      string = string + "+";
    }
  }
  return string;
}

function initializeControls() {
  let forwardLabel = document.getElementById("forwardLabel");
  let forwardString =
    "FORWARD KEY IS CURRENTLY: " + keyCodesToUnifiedName(getForwardKey());
  forwardLabel.innerHTML = forwardString;
  let backwardLabel = document.getElementById("backwardLabel");
  let backwardString =
    "BACKWARD KEY IS CURRENTLY: " + keyCodesToUnifiedName(getBackwardKey());
  backwardLabel.innerHTML = backwardString;
  let rightLabel = document.getElementById("rightLabel");
  let rightString =
    "RIGHT KEY IS CURRENTLY: " + keyCodesToUnifiedName(getRightKey());
  rightLabel.innerHTML = rightString;
  let leftLabel = document.getElementById("leftLabel");
  let leftString =
    "LEFT KEY IS CURRENTLY: " + keyCodesToUnifiedName(getLeftKey());
  leftLabel.innerHTML = leftString;
}

function forwardButtonClicked() {
  let forwardButton = document.getElementById("forwardButton");
  if (!forwardKeyInputOpened) {
    forwardButton.innerText = "ENTER";
    forwardKeyInputOpened = true;
    window.addEventListener("keydown", function(event) {
      forwardKeyPattern.push(event.keyCode);
    });
  } else {
    forwardButton.innerText = "SET KEY";
    forwardKeyInputOpened = false;
    window.removeEventListener("keydown", function(event) {
      forwardKeyPattern.push(event.keyCode);
    });
    setForwardKey(forwardKeyPattern);
    let forwardLabel = document.getElementById("forwardLabel");
    let forwardString =
      "FORWARD KEY IS CURRENTLY: " +
      newKeyCodesToUnifiedName(forwardKeyPattern);
    forwardLabel.innerHTML = forwardString;
    forwardKeyPattern = [];
  }
}

function backwardButtonClicked() {
  let backwardButton = document.getElementById("backwardButton");
  if (!backwardKeyInputOpened) {
    backwardButton.innerText = "ENTER";
    backwardKeyInputOpened = true;
    window.addEventListener("keydown", function(event) {
      backwardKeyPattern.push(event.keyCode);
    });
  } else {
    backwardButton.innerText = "SET KEY";
    backwardKeyInputOpened = false;
    window.removeEventListener("keydown", function(event) {
      backwardKeyPattern.push(event.keyCode);
    });
    setBackwardKey(backwardKeyPattern);
    let backwardLabel = document.getElementById("backwardLabel");
    let backwardString =
      "BACKWARD KEY IS CURRENTLY: " +
      newKeyCodesToUnifiedName(backwardKeyPattern);
    backwardLabel.innerHTML = backwardString;
    backwardKeyPattern = [];
  }
}

function rightButtonClicked() {
  let rightButton = document.getElementById("rightButton");
  if (!rightKeyInputOpened) {
    rightButton.innerText = "ENTER";
    rightKeyInputOpened = true;
    window.addEventListener("keydown", function(event) {
      rightKeyPattern.push(event.keyCode);
    });
  } else {
    rightButton.innerText = "SET KEY";
    rightKeyInputOpened = false;
    window.removeEventListener("keydown", function(event) {
      rightKeyPattern.push(event.keyCode);
    });
    setRightKey(rightKeyPattern);
    let rightLabel = document.getElementById("rightLabel");
    let rightString =
      "ROTATE LEFT KEY IS CURRENTLY: " +
      newKeyCodesToUnifiedName(rightKeyPattern);
    rightLabel.innerHTML = rightString;
    rightKeyPattern = [];
  }
}

function leftButtonClicked() {
  let leftButton = document.getElementById("leftButton");
  if (!leftKeyInputOpened) {
    leftButton.innerText = "ENTER";
    leftKeyInputOpened = true;
    window.addEventListener("keydown", function(event) {
      leftKeyPattern.push(event.keyCode);
    });
  } else {
    leftButton.innerText = "SET KEY";
    leftKeyInputOpened = false;
    window.removeEventListener("keydown", function(event) {
      leftKeyPattern.push(event.keyCode);
    });
    setLeftKey(leftKeyPattern);
    let leftLabel = document.getElementById("leftLabel");
    let leftString =
      "ROTATE RIGHT KEY IS CURRENTLY: " +
      newKeyCodesToUnifiedName(leftKeyPattern);
    leftLabel.innerHTML = leftString;
    leftKeyPattern = [];
  }
}

function addKeyToForward(event) {
  forwardKeyPattern.push(event.keyCode);
}

function addKeyToRight(event) {
  rightKeyPattern.push(event.keyCode);
}

function addKeyToLeft(event) {
  leftKeyPattern.push(event.keyCode);
}