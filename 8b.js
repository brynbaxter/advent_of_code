let input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

// let input = document.querySelector('pre').innerText;

let instructList = input.split('\n');

let visitedInstructions = [];
let accumulator = 0;
let noRepeats = true;
let position = 0;
let lastInstruction = instructList.length;
console.log('lastInstruction', lastInstruction);

while (position < lastInstruction) {
  let instruction = instructList[position];
  let operation = instruction.slice(0, 3);
  let argument = parseInt(instruction.slice(4), 10);

  // check if operation swap would break infinite loop
  if (operation == 'jmp' && position + 1 >= lastInstruction) {
    operation = 'nop';
    console.log(position);
  } else if (operation == 'nop' && position + argument >= lastInstruction) {
    operation = 'jmp';
    console.log(position);
  }

  // continue with program
  if (operation == 'acc') {
    accumulator += argument;
    position++;
  } else if (operation == 'jmp') {
    position += argument;
  } else {
    position++;
  }
  console.log(`${instruction} ${argument} => ${position}`);
}

console.log(accumulator);
