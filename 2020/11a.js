let input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

// let input = document.querySelector('pre').innerText;

let model = input.split('\n').map((x) => {
  return [...x];
});

for (let y = 0; y < model.length; y++) {
  for (let x = 0; x < model[y].length; x++) {
    console.log(model[y][x]);
  }
}

let getCurrentSeatStatus = (y, x) => {
  try {
    return model[y][x];
  } catch (error) {
    return null;
  }
};

let getNewSeatStatus = (y, x) => {
  numAdjacentOccupiedSeats = 0;
  if (model[y][x] == '.') {
    newModel[y][x] = '.';
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
    return numAdjacentOccupiedSeats;
  }
};

console.log('');

let newModel = JSON.parse(JSON.stringify(model));
newModel[0][0] = 'O';
console.log(newModel);
// newModel[0][0] = 'Yasdfasdf';
// for (let y = 0; y < newModel.length; y++) {
//   console.log(newModel[y]);
// }
// console.log('');
// for (let y = 0; y < model.length; y++) {
//   console.log(model[y]);
// }
// console.log('');

// for (let y = 0; y < model.length; y++) {
//   for (let x = 0; x < model[y].length; x++) {
//     let newSeatStatus = getNewSeatStatus(y, x);
//     console.log(y, x, newSeatStatus);
//     newModel[y][x] = newSeatStatus;
//   }
//   console.log('');
// }

// for (let y = 0; y < model.length; y++) {
//   console.log(newModel[y]);
// }
