const fs = require('fs');
const path = require('path');

let testInput = `.#.
..#
###`;

const puzzleInput = fs.readFileSync(
  path.resolve(__dirname, '17_input.txt'),
  'utf8'
);

const testProgram = true;
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

const cycleStruct = struct => {
  struct.forEach(activeCell => {
    let neighbors = getNeighbors(activeCell);
  });
};

const getNeighbors = activeCell => {
  let x = activeCell[0];
  let y = activeCell[1];
  let z = activeCell[2];
  console.log(x, y, z);
  for (let dX = x - 1; dX < x + 2; dX++) {
    for (let dY = y - 1; dY < y + 2; dY++) {
      for (let dZ = z - 1; dZ < z + 2; dZ++) {
        let cell = [dX, dY, dZ];
        let differentCell = JSON.stringify(activeCell) !== JSON.stringify(cell);
        if (differentCell) {
          console.log(cell);
        }
      }
    }
  }
};

let struct = initStructure(data);

// cycleStruct(struct);
getNeighbors([0, 0, 0]);
