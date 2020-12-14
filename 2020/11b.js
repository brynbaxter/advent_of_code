let input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

// let input = document.querySelector('pre').innerText;

let model = input.split('\n');

console.log(model);

let newModel = [];

for (let y = 0; y < model.length; y++) {
  newModel.push(model[y]);
}

for (let y = 0; y < model.length; y++) {
  console.log(newModel[y]);
}
