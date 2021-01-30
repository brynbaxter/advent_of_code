let sequence = [0, 13, 1, 8, 6, 15];
let length = sequence.length;
let last = sequence[sequence.length - 1];

const getPrevPosition = (sequence, last) => {
  let strippedSequence = sequence.slice(0, -1);
  let prevPosition = strippedSequence.lastIndexOf(last);
  return prevPosition;
};

while (sequence.length < 2020) {
  let last = sequence[sequence.length - 1];
  let prevPosition = getPrevPosition(sequence, last);
  let newLast;
  if (prevPosition == -1) {
    newLast = 0;
  } else {
    let positionDiff = sequence.length - 1 - prevPosition;
    newLast = positionDiff;
  }
  sequence.push(newLast);
}

console.log(sequence[sequence.length - 1]);
