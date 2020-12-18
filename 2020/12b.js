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
let wayX = 10;
let wayY = 1;
let x = 0;
let y = 0;

const moveStraight = (distance) => {
  x += wayX * distance;
  y += wayY * distance;
};

const rotateDirection = (turnDirection, angleChange) => {
  let angle;
  if (turnDirection == 'R') {
    angle = 360 - angleChange;
  } else if (turnDirection == 'L') {
    angle = angleChange;
  }
  switch (angle) {
    case 90:
      [wayX, wayY] = [-wayY, wayX];
      break;
    case 180:
      [wayX, wayY] = [-wayX, -wayY];
      break;
    case 270:
      [wayX, wayY] = [wayY, -wayX];
      break;
    default:
      console.log('rotateDirection error', turnDirection, angleChange);
  }

  while (direction >= 360) {
    direction -= 360;
  }

  while (direction < 0) {
    direction += 360;
  }
};

const moveWaypoint = (action, value) => {
  switch (action) {
    case 'N':
      wayY += value;
      break;
    case 'E':
      wayX += value;
      break;
    case 'S':
      wayY -= value;
      break;
    case 'W':
      wayX -= value;
      break;
    default:
      console.log('moveWayPoint error', action, value);
  }
};

const executeCommand = (command) => {
  action = command[0];
  value = command[1];
  switch (action) {
    case 'F':
      moveStraight(value);
      break;
    case 'L':
    case 'R':
      rotateDirection(action, value);
      break;
    case 'N':
    case 'E':
    case 'S':
    case 'W':
      moveWaypoint(action, value);
      break;
    default:
      console.log('something went wrong');
  }
};

commands.forEach((command) => {
  executeCommand(command);
});

console.log('Final position:', 'x', x, 'y', y);
console.log('abs(x) + abs(y) =', Math.abs(x) + Math.abs(y));
