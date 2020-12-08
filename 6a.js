let input = `abc

a
b
c

ab
ac

a
a
a
a

b`;

// let input = document.querySelector('pre').innerText;

let puzz = input.split('\n\n');

let makeUnique = (str) => String.prototype.concat(...new Set(str));

let puzzleAnswer = 0;

for (let i = 0; i < puzz.length; i++) {
  let group = puzz[i].split('\n').join(''); // remove breaklines and group answers into single string
  let groupSet = makeUnique(group); // add answers to Set, thus removing duplicates
  let uniqueAnswerCount = groupSet.length;
  puzzleAnswer += uniqueAnswerCount;
}

console.log(puzzleAnswer);
