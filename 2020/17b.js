const fs = require('fs');
const path = require('path');
const { start } = require('repl');

let testInput = `.#.
..#
###`;

const puzzleInput = fs.readFileSync(
  path.resolve(__dirname, '17_input.txt'),
  'utf8'
);

const testProgram = false;
const input = testProgram ? testInput : puzzleInput;
// console.log(input);

let data = input.replace(/\r/g, '').split('\n');

const initStructure = data => {
  let dZ = 0;
  let dW = 0;
  let struct = [];
  data.forEach((row, dY) => {
    for (let dX = 0; dX < row.length; dX++) {
      let val = row.slice(dX, dX + 1);
      if (val === '#') {
        struct.push([dX, dY, dZ, dW]);
      }
    }
  });
  return struct;
};

const getNeighbors = centreCell => {
  let x = centreCell[0];
  let y = centreCell[1];
  let z = centreCell[2];
  let w = centreCell[3];
  let neighborsArr = [];
  for (let dX = x - 1; dX < x + 2; dX++) {
    for (let dY = y - 1; dY < y + 2; dY++) {
      for (let dZ = z - 1; dZ < z + 2; dZ++) {
        for (let dW = w - 1; dW < w + 2; dW++) {
          let cell = [dX, dY, dZ, dW];
          let isCentreCell =
            JSON.stringify(centreCell) === JSON.stringify(cell);
          if (!isCentreCell) {
            neighborsArr.push(cell);
          }
        }
      }
    }
  }
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

const cellPositive = cell => {
  if (cell[2] >= 0 && cell[3] >= 0) {
    return true;
  } else {
    return false;
  }
};

const addNegativePlane = struct => {
  let newStruct = [];
  struct.forEach(cell => {
    if (cell[2] > 0) {
      let ntivePlaneCell = [cell[0], cell[1], -cell[2], cell[3]];
      newStruct.push(ntivePlaneCell);
    }
    newStruct.push(cell);
  });
  return newStruct;
};

const addPastPlane = struct => {
  let newStruct = [];
  struct.forEach(cell => {
    if (cell[3] > 0) {
      let pastPlaneCell = [cell[0], cell[1], cell[2], -cell[3]];
      newStruct.push(pastPlaneCell);
    }
    newStruct.push(cell);
  });
  return newStruct;
};

const oneCycle = struct => {
  let allPossibleNeighbors = [];

  struct.forEach(activeCell => {
    let cellNeighbors = getNeighbors(activeCell);
    cellNeighbors.forEach(neighbor => {
      if (
        !isSubArray(allPossibleNeighbors, neighbor) &&
        cellPositive(neighbor)
      ) {
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

for (let i = 0; i < 6; i++) {
  let startTime = new Date();
  struct = oneCycle(struct);
  struct = addNegativePlane(struct);
  struct = addPastPlane(struct);
  let endTime = new Date();
  console.log(i + 1, '=', struct.length, 'duration', endTime - startTime);
}

console.log('answer', struct.length);
console.log('');

// 1 = 195 duration 1232
// 2 = 192 duration 12711
// 3 = 1100 duration 26352
// 4 = 852 duration 284720
// 5 = 2516 duration 312012
// 6 = 2620 duration 1496552
// answer 2620
