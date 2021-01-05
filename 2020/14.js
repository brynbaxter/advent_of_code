let input = `mask = 00X1001X
mem[42] = 100
mask = 0000X0XX
mem[26] = 1`;

// let input = document.querySelector('pre').innerText;

// const fs = require('fs');
// const path = require('path');
// const input = fs.readFileSync(path.resolve(__dirname, '14_input.txt'), 'utf8');

let commands = input
  .replace(/\r/g, '')
  .split('\n')
  .map((x) => {
    return x.split(' = ');
  });

const applyBitmaskV1 = (integer, bitmask) => {
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
      let newValue = applyBitmaskV1(x[1], bitmask);
      memory[memPosition] = newValue;
    }
  });
  let sum = sumMemory(memory);
  return sum;
};

const getMappedFloatingBits = (bitmask) => {
  let answerArr = [];
  console.log(bitmask);
  let countX = bitmask.split('X').length - 1;
  for (let i = 0; i < countX; i++) {
    let bitString = i.toString(2);
    while (bitString.length < countX.toString(2).length) {
      bitString = '0' + bitString;
    }
    let bitArray = Array.from(bitString);
    console.log(countX, bitString);
  }
};

const partTwo = () => {
  let memory = [];
  let bitmask = '';
  commands.forEach((command) => {
    if (command[0] == 'mask') {
      bitmask = command[1];
    } else {
      let memPosition = command[0].slice(4, -1);
      let mappedFloatingBits = getMappedFloatingBits(bitmask);
    }
  });
  let sum = sumMemory(memory);
  return sum;
};

console.log('part one', partOne());

console.log('part two', partTwo());
