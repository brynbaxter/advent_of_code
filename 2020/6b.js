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

let input = document.querySelector('pre').innerText;

let puzz = input.split('\n\n');

let makeUnique = (str) => String.prototype.concat(...new Set(str));

let puzzleAnswer = 0;

// iterate through each response group
for (let i = 0; i < puzz.length; i++) {
  let group = puzz[i].split('\n').filter(Boolean);
  let groupSize = group.length;
  let groupResponses = {};
  console.log(group);

  // iterate through each person in group
  for (let person = 0; person < group.length; person++) {
    // iterate through each persons answers
    for (let response of group[person]) {
      if (groupResponses.hasOwnProperty(response)) {
        groupResponses[response] += 1;
      } else {
        groupResponses[response] = 1;
      }
    }
    for (const [key, value] of Object.entries(groupResponses)) {
      if (groupSize == value) {
        console.log(key);
        puzzleAnswer++;
      }
    }
  }
}

console.log(`Answer: ${puzzleAnswer}`);
