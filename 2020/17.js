const fs = require('fs');
const path = require('path');

let testInput = `.#.
..#
###`;

const puzzleInput = fs.readFileSync(
  path.resolve(__dirname, '17_input.txt'),
  'utf8'
);

const testProgram = false;
const input = testProgram ? testInput : puzzleInput;
console.log(input);

let data = input.replace(/\r/g, '').split('\n');

const initStructure = data => {
  let dZ = 0;
  let struct = [];
  data.forEach((row, dY) => {
    for (let dX = 0; dX < row.length; dX++) {
      let val = row.slice(dX, dX + 1);
      if (val === '#') {
        struct.push([dX, dY, dZ]);
      }
    }
  });
  return struct;
};

const getNeighbors = centreCell => {
  let x = centreCell[0];
  let y = centreCell[1];
  let z = centreCell[2];
  let neighborsSet = new Set();
  for (let dX = x - 1; dX < x + 2; dX++) {
    for (let dY = y - 1; dY < y + 2; dY++) {
      for (let dZ = z - 1; dZ < z + 2; dZ++) {
        let cell = [dX, dY, dZ];
        let differentCell = JSON.stringify(centreCell) !== JSON.stringify(cell);
        if (differentCell) {
          neighborsSet.add(cell);
        }
      }
    }
  }
  let neighborsArr = Array.from(neighborsSet);
  return neighborsArr;
};

// check if sub/cell is a subarray/active in the master/structure array
const isSubArray = (master, sub) => {
  for (let i = 0; i < master.length; i++) {
    if (JSON.stringify(master[i]) === JSON.stringify(sub)) {
      return true;
    }
  }
  return false;
};

const getNewStatus = (cell, currentStruct) => {
  let neighbors = getNeighbors(cell);
  let cellIsActive = isSubArray(currentStruct, cell);
  let activeNeighborCount = 0;

  neighbors.forEach(neighbor => {
    if (isSubArray(currentStruct, neighbor)) {
      activeNeighborCount++;
    }
  });

  if (!cellIsActive && activeNeighborCount === 3) {
    return true;
  } else if (cellIsActive && activeNeighborCount === 2) {
    return true;
  } else if (cellIsActive && activeNeighborCount === 3) {
    return true;
  } else {
    return false;
  }
};

const oneCycle = struct => {
  let allPossibleNeighbors = [];

  struct.forEach(activeCell => {
    let cellNeighbors = getNeighbors(activeCell);
    cellNeighbors.forEach(neighbor => {
      if (!isSubArray(allPossibleNeighbors, neighbor)) {
        allPossibleNeighbors.push(neighbor);
      }
    });
  });

  let newStruct = [];
  allPossibleNeighbors.forEach(cell => {
    if (!isSubArray(newStruct, cell) && getNewStatus(cell, struct)) {
      newStruct.push(cell);
    }
  });
  return newStruct;
};

let struct = initStructure(data);

// let test = [0, 1, 0];
// console.log(test, getNewStatus(test, struct));

for (let i = 0; i < 6; i++) {
  struct = oneCycle(struct);
  console.log(i, '=', struct.length);
}

// struct.forEach(cell => {
//   console.log(cell);
// });
console.log('answer', struct.length);
