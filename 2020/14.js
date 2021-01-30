// let input = `mask = 000000000000000000000000000000X1001X
// mem[42] = 100
// mask = 00000000000000000000000000000000X0XX
// mem[26] = 1`;

// let input = document.querySelector('pre').innerText;

const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, '14_input.txt'), 'utf8');

let commands = input
  .replace(/\r/g, '')
  .split('\n')
  .map(x => {
    return x.split(/ = |\[|\]/);
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

const sumMemory = memory => {
  let sum = 0;
  Object.values(memory).forEach(int => {
    if (int) {
      sum = sum + parseInt(int, 10);
    }
  });
  return sum;
};

const partOne = () => {
  let memory = [];
  let bitmask = '';
  commands.forEach(commands => {
    if (commands[0] == 'mask') {
      bitmask = commands[1];
    } else {
      let memPosition = commands[1];
      let newValue = applyBitmaskV1(commands[3], bitmask);
      memory[memPosition] = newValue;
    }
  });
  let sum = sumMemory(memory);
  return sum;
};

const intToBinary = (integer, mapLength) => {
  let bitString = Number(integer).toString(2);
  while (bitString.length < mapLength) {
    bitString = '0' + bitString;
  }
  return bitString;
};

const applyBitmaskV2 = (bitString, bitmask) => {
  let bitArr = bitString.split('');
  let maskArr = bitmask.split('');
  let mappedArr = bitArr.map((bit, index) => {
    if (maskArr[index] === 'X') {
      return 'X';
    } else if (maskArr[index] === '1') {
      return '1';
    } else {
      return bit;
    }
  });
  let mappedString = mappedArr.join('');
  return mappedString;
};

const evaluateMappedString = mappedString => {
  // console.log('eval', mappedString);
  let answerArr = [];
  let countX = bitmask.split('X').length - 1;

  for (let i = 0; i < 2 ** countX; i++) {
    let bitString = intToBinary(i, countX);
    let mappedArray = Array.from(mappedString);

    let instanceX = 0;
    let newArray = [];
    mappedArray.forEach(bit => {
      if (bit === 'X') {
        let newVal = Array.from(bitString)[instanceX];
        newArray.push(newVal);
        instanceX++;
      } else {
        newArray.push(bit);
      }
    });
    answer = parseInt(newArray.join(''), 2);
    answerArr.push(answer);
  }
  return answerArr;
};

const partTwo = () => {
  commands.forEach(command => {
    if (command[0] == 'mask') {
      bitmask = command[1];
    } else {
      let position = command[1];
      let value = command[3];
      let bitString = intToBinary(position, bitmask.length);
      let mappedString = applyBitmaskV2(bitString, bitmask);
      let positionArray = evaluateMappedString(mappedString);
      positionArray.forEach(position => {
        memory[position] = value;
      });
    }
  });
  let sum = sumMemory(memory);
  return sum;
};

console.log('part one', partOne());

let memory = {};
let bitmask = '';
console.log('part two', partTwo());
