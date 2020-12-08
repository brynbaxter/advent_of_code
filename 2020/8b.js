let input = `nop +0
nop +7
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

// let input = document.querySelector('pre').innerText;

let instructList = input.split('\n');

for (let i = 0; i < instructList.length; i++) {
  if (i + parseInt(instructList[i].slice(4), 10) == 596) {
    console.log('former', i, instructList[i]);
  } else if (i + 1 == instructList.length - 1) {
    console.log('latter', i, instructList[i]);
  }
}

let accumulator = 0;
let position = 0;
let lastPosition = instructList.length - 1;
console.log('lastPosition', lastPosition, '\n');

while (position <= lastPosition) {
  let instruction = instructList[position];
  let operation = instruction.slice(0, 3);
  let argument = parseInt(instruction.slice(4), 10);
  console.log(`Position ${position} || ${operation} ${argument}`);

  // check if operation swap would break infinite loop
  if (operation == 'jmp' && position + 1 == lastPosition) {
    operation = 'nop';
    console.log('change jmp => nop');
  }
  if (operation == 'nop' && position + argument == lastPosition) {
    operation = 'jmp';
    console.log('change nop => jmp');
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
  console.log(` => ${position}\n`);
}

console.log(accumulator);
