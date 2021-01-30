let startTime = new Date();
let sequence = [0, 13, 1, 8, 6, 15];
let length = sequence.length;
let lastNum = sequence[sequence.length - 1];

let dict = {};

sequence.forEach((x, index) => {
  if (x in dict) {
    dict[x.toString()].push(index);
  } else {
    dict[x.toString()] = [index];
  }
});

while (length < 30_000_000) {
  if (dict[lastNum].length > 1) {
    let prevPositions = dict[lastNum];
    let positionDiff = length - 1 - prevPositions[prevPositions.length - 2];

    if (dict[positionDiff] == undefined) {
      dict[positionDiff] = [];
    }

    dict[positionDiff].push(length);
    if (dict[positionDiff].length > 2) {
      dict[positionDiff].shift();
    }
    lastNum = positionDiff;
    length++;
  } else {
    if (dict[0] == undefined) {
      dict[0] = [];
    }
    lastNum = 0;
    dict[0].push(length);
    length++;
  }
}

console.log(lastNum);

let endTime = new Date();
console.log('time to run', endTime - startTime);
