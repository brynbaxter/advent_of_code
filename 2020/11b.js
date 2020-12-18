// let input = `L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL`;

// let input = document.querySelector('pre').innerText;

const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, '11_input.txt'), 'utf8');

let direcs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

// create model from input
let model = input
  .replace(/\r/g, '')
  .split('\n')
  .map((x) => {
    return [...x];
  });

// get character currently in seat. if beyond bounds, ignore error and return invalid
let getCurrentSeatStatus = (y, x) => {
  try {
    if (model[y][x] !== undefined) {
      return model[y][x];
    } else {
      return 'beyond';
    }
  } catch (error) {
    return 'beyond';
  }
};

let checkDirection = (y, x, direc) => {
  for (let disp = 1; disp < model.length; disp++) {
    let currentSeatStatus = getCurrentSeatStatus(
      y + direc[0] * disp,
      x + direc[1] * disp
    );

    if (currentSeatStatus == 'beyond') {
      return false;
    } else if (currentSeatStatus == 'L') {
      return false;
    } else if (currentSeatStatus == '#') {
      return true;
    }
  }
};

let getNewSeatStatus = (y, x) => {
  numAdjacentOccupiedSeats = 0;
  if (model[y][x] == '.') {
    return '.';
  } else {
    for (let dir = 0; dir < direcs.length; dir++) {
      let adjacentSeatOccupied = checkDirection(y, x, direcs[dir]);
      if (adjacentSeatOccupied) {
        numAdjacentOccupiedSeats++;
      }
    }
    if (numAdjacentOccupiedSeats == 0) {
      return '#';
    } else if (model[y][x] == '#' && numAdjacentOccupiedSeats >= 5) {
      return 'L';
    } else {
      return model[y][x];
    }
  }
};

// start 'game of life' until seating stabilises
let matched = false;
for (let a = 0; a < 100; a++) {
  let newModel = JSON.parse(JSON.stringify(model));

  for (let y = 0; y < model.length; y++) {
    for (let x = 0; x < model[y].length; x++) {
      let newSeatStatus = getNewSeatStatus(y, x);
      newModel[y][x] = newSeatStatus;
    }
  }

  // if current seating same as new, stop 'game of life'
  if (JSON.stringify(model) == JSON.stringify(newModel)) {
    for (let y = 0; y < newModel.length; y++) {
      console.log(newModel[y].join(''));
    }
    console.log('Match on iteration:', a);
    matched = true;
    break;
  }
  model = JSON.parse(JSON.stringify(newModel));
}

// tally occupied seats of final answer
let occupiedSeats = 0;
for (let y = 0; y < model.length; y++) {
  for (let x = 0; x < model[y].length; x++) {
    let seatStatus = getCurrentSeatStatus(y, x);
    if (seatStatus == '#') {
      occupiedSeats++;
    }
  }
}

console.log('occupied seats:', occupiedSeats);
