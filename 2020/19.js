const fs = require('fs');
const path = require('path');

const getTestInput = () => {
  const input = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`;
  const inputSplit = input.replace(/\r/g, '').split('\n\n');
  const rules = inputSplit[0].split('\n');
  const messages = inputSplit[1].split('\n');
  return [rules, messages];
};

const getInput = () => {
  const input = fs.readFileSync(
    path.resolve(__dirname, '19_input.txt'),
    'utf8'
  );
  const inputSplit = input.replace(/\r| /g, '').split('\n\n');
  const rules = inputSplit[0].split('\n');
  const messages = inputSplit[1].split('\n');
  return [rules, messages];
};

const useTestInput = true;
const [rules, messages] = useTestInput ? getTestInput() : getInput();

console.log(rules.join('\n'));
console.log('');
console.log(messages.join('\n'));
