let input = `939
17,x,13,19`;

// let input = document.querySelector('pre').innerText;

// const fs = require('fs');
// const path = require('path');
// const input = fs.readFileSync(path.resolve(__dirname, '13_input.txt'), 'utf8');

let notes = input.replace(/\r/g, '').split('\n');

let busArr = notes[1].split(',').map((item) => {
  if (item == 'x') {
    return item;
  } else {
    return parseInt(item);
  }
});

let newStartTime = busArr[0];
let lastConfirmedTime = busArr[0];
console.log(newStartTime);

const getCommonTime = (i) => {
  while (true) {
    console.log((newStartTime + i) / busArr[i]);
    if ((newStartTime + i) % busArr[i] == 0) {
      lastConfirmedTime = newStartTime;
      console.log('lastConfirmedTime', lastConfirmedTime);
      break;
    } else {
      newStartTime += lastConfirmedTime;
    }
  }
};

for (let i = 1; i < busArr.length; i++) {
  console.log(busArr[i]);
  if (busArr[i] !== 'x') {
    getCommonTime(i);
  }
}

console.log(lastConfirmedTime);
