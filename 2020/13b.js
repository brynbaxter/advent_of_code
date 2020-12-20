// let input = `1789,37,47,1889`;

// let input = document.querySelector('pre').innerText;

const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, '13_input.txt'), 'utf8');

let notes = input.replace(/\r/g, '').split('\n');

let busArr = notes[1].split(',').map((item) => {
  if (item == 'x') {
    return item;
  } else {
    return parseInt(item);
  }
});

const busLeavesAtThisTime = (bus, desiredTime) => {
  if (bus == 'x') {
    return true;
  } else if (desiredTime / bus == Math.floor(desiredTime / bus)) {
    return true;
  } else {
    return false;
  }
};

const checkFleet = (firstBusDeparture) => {
  for (let bus = 1; bus < busArr.length; bus++) {
    let desiredTime = firstBusDeparture + bus;
    let matched = busLeavesAtThisTime(busArr[bus], desiredTime);
    if (!matched) {
      return false;
    }
  }
  console.log(firstBusDeparture);
  return true;
};

// loops i = 7, 14, 21, 28, ...
// iterate through each time the first bus leaves depot
let fleetPassed = false;
let cycle = 1;
while (!fleetPassed) {
  let firstBusDeparture = busArr[0] * cycle;
  console.log(firstBusDeparture);
  let fleetPassed = checkFleet(firstBusDeparture);
  if (fleetPassed) {
    break;
  } else {
    cycle++;
  }
}
