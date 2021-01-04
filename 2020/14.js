// let input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0
// `;

// let input = document.querySelector('pre').innerText;

const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, '14_input.txt'), 'utf8');

let commands = input
  .replace(/\r/g, '')
  .split('\n')
  .map((x) => {
    return x.split(' = ');
  });

const applyBitmask = (integer, bitmask) => {
  let bitString = Math.abs(integer).toString(2);
  while (bitString.length < bitmask.length) {
    bitString = '0' + bitString;
  }
  let bitArray = Array.from(bitString);

  for (let i = 1; i <= bitArray.length; i++) {
    let bitmaskValue = bitmask.slice(
      bitmask.length - i,
      bitmask.length - i + 1
    );
    if (bitmaskValue !== 'X') {
      bitArray[bitArray.length - i] = bitmaskValue;
    }
  }
  let newInteger = parseInt(bitArray.join(''), 2);
  return newInteger;
};

const sumMemory = (memory) => {
  initialValue = 0;
  let sum = memory.reduce(
    (totalValue, currentValue) => totalValue + currentValue,
    initialValue
  );
  return sum;
};

const partOne = () => {
  let memory = [];
  let bitmask = '';
  commands.forEach((x) => {
    if (x[0] == 'mask') {
      bitmask = x[1];
    } else {
      let memPosition = x[0].slice(4, -1);
      let newValue = applyBitmask(x[1], bitmask);
      memory[memPosition] = newValue;
    }
  });
  let sum = sumMemory(memory);
  return sum;
};

console.log(partOne());
