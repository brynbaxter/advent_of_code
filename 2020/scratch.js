let sequence = [0, 13, 1, 8, 6, 15, 13];
let length = sequence.length;
let last = sequence[sequence.length - 1];

let dict = {};

sequence.forEach((x, index) => {
  if (x in dict) {
    dict[x].push(index);
  } else {
    dict[x] = [index];
  }
});

console.log(dict);
console.log(15 in dict);
console.log('last', dict[last].length);

if (dict[last].length > 1) {
  let prevPositions = dict[last];
  console.log(prevPositions);
}
