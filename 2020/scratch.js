let sequence = [0, 13, 1, 8, 6, 15, 15, 0];
let length = sequence.length;

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
