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

while (noRepeats == true) {
  let instruction = instructList[position];
  let operation = instruction.slice(0, 3);
  let argument = parseInt(instruction.slice(4), 10);
  if (operation == 'acc') {
    accumulator += argument;
    position++;
  } else if (operation == 'jmp') {
    position += argument;
  } else {
    position++;
  }
  console.log(`${instruction} ${argument} => ${position}`);
  if (visitedInstructions.includes(position)) {
    noRepeats = false;
  } else {
    visitedInstructions.push(position);
  }
}

console.log(accumulator);
