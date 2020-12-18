// let input = `F10
// N3
// F7
// R90
// F11`;

// let input = document.querySelector('pre').innerText;

const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, '12_input.txt'), 'utf8');

let commands = input
  .replace(/\r/g, '')
  .split('\n')
  .map((x) => {
    return [x.slice(0, 1), parseInt(x.slice(1))];
  });

let direction = 90;
let x = 0;
let y = 0;

const moveStraight = (distance) => {
  switch (direction) {
    case 0:
      y += distance;
      break;
    case 90:
      x += distance;
      break;
    case 180:
      y -= distance;
      break;
    case 270:
      x -= distance;
      break;
    default:
      console.log('moveForward error', distance);
  }
};

const changeDirection = (turnDirection, angleChange) => {
  switch (turnDirection) {
    case 'L':
      direction -= angleChange;
      break;
    case 'R':
      direction += angleChange;
      break;
    default:
      console.log('changeDirection error', angleChange);
  }

  // ensure angle always between 0 and 360
  while (direction >= 360) {
    direction -= 360;
  }
  while (direction < 0) {
    direction += 360;
  }
};

commands.forEach((e) => console.log(e));

commands.forEach((command) => {
  action = command[0];
  value = command[1];
  switch (action) {
    case 'F':
      moveStraight(value);
      break;
    case 'L':
    case 'R':
      changeDirection(action, value);
      break;
    case 'N':
      y += value;
      break;
    case 'E':
      x += value;
      break;
    case 'S':
      y -= value;
      break;
    case 'W':
      x -= value;
      break;
    default:
      console.log('something went wrong');
  }
});

console.log('x', x, 'y', y);
console.log('abs(x) + abs(y) =', Math.abs(x) + Math.abs(y));
