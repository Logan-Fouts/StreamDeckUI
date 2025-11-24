import data from './buttons.json'; 

let BUTTONS = data.buttons;

export default function loadButtonConfig(expectedNumButtons) {
  // If the loaded config has too many buttons, trim the excess
  if (BUTTONS.length > expectedNumButtons) {
    BUTTONS = BUTTONS.slice(0, expectedNumButtons);
    return BUTTONS;
  }
  if (BUTTONS.length < expectedNumButtons) {
    const validID = getValidID();
    const tmpBtns = Array(expectedNumButtons).fill().map((_, i) => ({ id: i + validID, label: '', type: 0 }));
    for (let i = 0; i < BUTTONS.length; i++) {
      tmpBtns[i] = BUTTONS[i];
    }
    BUTTONS = tmpBtns;
    return BUTTONS;
  } 

  return BUTTONS;
}

// As of now just returns a number higher than the highest current id
// May implement a more robust ID validation system in the future
export function getValidID() {
  let maxID = -1;
  function dfs(buttons) {
    for (let button of buttons) {
      if (button.id > maxID) {
        maxID = button.id;
      }
      if (button.type === 2 && button.child) {
        dfs(button.child);
      }
    }
  }
  dfs(BUTTONS);
  return maxID + 1;
}

function printConfig(buttons) {
  console.log("Current Config:");
  console.log(buttons);
}

export function saveConfig(currLvl, parents) {
  console.log("Saving Config:", currLvl);
  // Root
  if (parents.length == 0) {
    BUTTONS = currLvl;
    printConfig(BUTTONS);
    return;
  }

  // Child
  function findParent(buttons, parentID) {
    for (let button of buttons) {
      if (button.id == parentID) {
        button.child = currLvl;
        return;
      }
      if (button.type == 2 && button.child != null) findParent(button.child, parentID);
    }
  }

  findParent(BUTTONS, parents[parents.length-1].id);
  printConfig(BUTTONS);
}
