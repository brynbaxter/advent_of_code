const fs = require('fs');
const path = require('path');

let testInput = `1 + 2 * 3 + 4 * 5 + 6`;

const puzzleInput = fs.readFileSync(
  path.resolve(__dirname, '18_input.txt'),
  'utf8'
);

const testProgram = true;
const input = testProgram ? testInput : puzzleInput;
console.log(input);

let data = input.replace(/\r/g, '').split(' ');

console.log(data);

const evalOperator = (valA, operator, valB) => {
  switch (operator) {
    case '+':
      return Number(valA) + Number(valB);
      break;
    case '*':
      return Number(valA) * Number(valB);
      break;
  }
};

console.log(evalOperator('2', '*', '3'));
