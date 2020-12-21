// let input = `939
// 1789,37,47,1889`;

// let input = document.querySelector('pre').innerText;

const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, '13_input.txt'), 'utf8');

const [firstBus, ...buses] = input
  .split('\n')[1]
  .split(',')
  .map((n, i) => [parseInt(n, 10), i])
  .filter(([n]) => !Number.isNaN(n));

let multiplier = firstBus[0];
let firstViableTime = 0;

buses.forEach(([bus, busIndex]) => {
  while (true) {
    if ((firstViableTime + busIndex) % bus === 0) {
      multiplier *= bus;
      break;
    }
    firstViableTime += multiplier;
  }
});

console.log(firstViableTime);
