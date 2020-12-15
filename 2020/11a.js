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

let model = input.split('\n').map((x) => {
  return [...x];
});

let getCurrentSeatStatus = (y, x) => {
  try {
    return model[y][x];
  } catch (error) {
    return 'something';
  }
};

let getNewSeatStatus = (y, x) => {
  numAdjacentOccupiedSeats = 0;
  if (model[y][x] == '.') {
    return '.';
  } else {
    // check top-left
    if (getCurrentSeatStatus(y - 1, x - 1) == '#') {
      numAdjacentOccupiedSeats++;
    }
    // check top-center
    if (getCurrentSeatStatus(y - 1, x) == '#') {
      numAdjacentOccupiedSeats++;
    }
    // check top-right
    if (getCurrentSeatStatus(y - 1, x + 1) == '#') {
      numAdjacentOccupiedSeats++;
    }
    // check mid-left
    if (getCurrentSeatStatus(y, x - 1) == '#') {
      numAdjacentOccupiedSeats++;
    }
    // check mid-right
    if (getCurrentSeatStatus(y, x + 1) == '#') {
      numAdjacentOccupiedSeats++;
    }
    // check bottom-left
    if (getCurrentSeatStatus(y + 1, x - 1) == '#') {
      numAdjacentOccupiedSeats++;
    }
    // check bottom-centre
    if (getCurrentSeatStatus(y + 1, x) == '#') {
      numAdjacentOccupiedSeats++;
    }
    // check bottom-right
    if (getCurrentSeatStatus(y + 1, x + 1) == '#') {
      numAdjacentOccupiedSeats++;
    }
    if (numAdjacentOccupiedSeats == 0) {
      return '#';
    } else if (model[y][x] == '#' && numAdjacentOccupiedSeats >= 4) {
      return 'L';
    } else {
      return model[y][x];
    }
  }
};

let matched = false;
for (let a = 0; a < 100; a++) {
  let newModel = JSON.parse(JSON.stringify(model));

  for (let y = 0; y < model.length; y++) {
    for (let x = 0; x < model[y].length; x++) {
      let newSeatStatus = getNewSeatStatus(y, x);
      newModel[y][x] = newSeatStatus;
    }
  }

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
