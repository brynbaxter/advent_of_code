let input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

// let input = document.querySelector('pre').innerText;

const inputLineToObjectModel = (sentence) => {
  let splitSentence = sentence.split(/s* contain |s*, |s*\./);
  let rootBag = splitSentence[0];
  if (splitSentence[1] == 'no other bag') {
    dataModel[rootBag] = null;
  } else {
    nestedBags = {};
    // loop ignores trailing '' at end of list
    for (let i = 1; i < splitSentence.length - 1; i++) {
      // console.log(splitSentence[i]); // example '3 bright white bags'
      let bagCount = splitSentence[i][0]; // example '3'
      let bagType = splitSentence[i].slice(2); // example 'bright white bags'

      nestedBags[bagType] = bagCount;
      dataModel[rootBag] = nestedBags;
    }
  }
};

let puzzle = input.split('\n');
let dataModel = {};
let model = puzzle.map(inputLineToObjectModel);

const countBagsInside = (bagType) => {
  let bagCount = 0;
  if (dataModel[bagType] != null) {
    for (const [key, value] of Object.entries(dataModel[bagType])) {
      bagCount += parseInt(value);
      bagCount += value * countBagsInside(key);
    }
  }
  return bagCount;
};

let topLevelBag = 'shiny gold bag';

let answer = countBagsInside(topLevelBag);

console.log('Answer:', answer);
