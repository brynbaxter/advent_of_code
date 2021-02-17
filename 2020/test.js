const f2c = x => {
  const convert = (str, p1, offset, s) => {
    return ((p1 - 32) * 5) / 9 + 'C';
  };
  let s = String(x);
  let test = /(-?\d+(?:\.\d*)?)F\b/g;
  return s.replaceAll(test, convert);
};

let str = '70Fasdfdf80F';
str = f2c(str);
console.log('str', str);
str = f2c(str);
console.log('str', str);

// const p =
//   'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

// console.log(p.replaceAll('dog', 'monkey'));

// const regex = /Dog/gi;
// console.log(p.replaceAll(regex, 'ferret'));
