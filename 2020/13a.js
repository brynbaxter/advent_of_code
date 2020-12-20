// let input = `939
// 7,13,x,x,59,x,31,19`;

// let input = document.querySelector('pre').innerText;

const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, '13_input.txt'), 'utf8');

let notes = input.replace(/\r/g, '').split('\n');
let shortestWait = 1000;
let shortestWaitBus;

let earliestTime = parseInt(notes[0]);
let busArr = notes[1].split(',').map((item) => {
  if (item == 'x') {
    return item;
  } else {
    return parseInt(item);
  }
});

// get the timestamp for the first departure
const getNextAfterEarliest = (bus) => {
  let time = 0;
  while (time < earliestTime) {
    time += bus;
  }
  return time;
};

busArr.forEach((bus) => {
  if (bus !== 'x') {
    let firstAvailable = getNextAfterEarliest(bus);
    let timeWaiting = firstAvailable - earliestTime;
    if (timeWaiting < shortestWait) {
      shortestWait = timeWaiting;
      shortestWaitBus = bus;
    }
  }
});

console.log('shortestWaitBus', shortestWaitBus);
console.log('shortestWait', shortestWait);

console.log('bus x wait = ', shortestWaitBus * shortestWait);
