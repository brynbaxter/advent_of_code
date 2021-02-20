const fs = require('fs');
const path = require('path');

const getTestInput = () => {
  const input = `42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`;

  const inputSplit = input.replace(/\r/g, '').split('\n\n');
  const rules = inputSplit[0].split('\n');
  const messages = inputSplit[1].split('\n');

  const ruleObj = new Object();
  rules.forEach(rule => {
    let [ruleKey, ruleVal] = rule.split(': ');
    ruleVal = ruleVal.replaceAll(/"/g, '');
    ruleObj[ruleKey] = ruleVal;
  });

  return [ruleObj, messages];
};

const getInput = () => {
  const input = fs.readFileSync(
    path.resolve(__dirname, '19_input.txt'),
    'utf8'
  );
  const inputSplit = input.replace(/\r/g, '').split('\n\n');
  const rules = inputSplit[0].split('\n');
  const messages = inputSplit[1].split('\n');

  const ruleObj = new Object();
  rules.forEach(rule => {
    let [ruleKey, ruleVal] = rule.split(': ');
    ruleVal = ruleVal.replaceAll(/"/g, '');
    ruleObj[ruleKey] = ruleVal;
  });

  return [ruleObj, messages];
};

const addBracketsIfPipe = ruleStr => {
  if (ruleStr.indexOf('|') > -1 && ruleStr.indexOf('(') === -1) {
    return '( ' + ruleStr + ' )';
  } else {
    return ruleStr;
  }
};

const evalRule = (ruleObj, ruleKey) => {
  let ruleStr = ruleObj[ruleKey];
  ruleStr = addBracketsIfPipe(ruleStr);

  ruleStr = ruleStr.replace(/\d+/g, nestedRuleKey => {
    return evalRule(ruleObj, nestedRuleKey);
  });
  ruleStr = ruleStr.replaceAll(' ', '');

  ruleObj[ruleKey] = ruleStr;
  return ruleStr;
};

const useTestInput = false;
let [ruleObj, messages] = useTestInput ? getTestInput() : getInput();
const regexp = '^' + evalRule(ruleObj, '0') + '$';

let partOneAnswer = 0;
messages.forEach(message => {
  let check = message.search(regexp);
  if (check === 0) {
    partOneAnswer++;
  }
});
console.log('Part 1:', partOneAnswer);

// ### Part 2 ###

// get data from scratch, as the inital data has been updated by Part 1
[ruleObj, messages] = useTestInput ? getTestInput() : getInput();

ruleObj['8'] = '42 | 42 8';
ruleObj['11'] = '42 31 | 42 11 31';
// replace above rules with more expressive regex
ruleObj['8'] = '(42)+';
ruleObj['11'] = '42 (42 (42 (42 31)? 31)? 31)? 31';

const regexp2 = '^' + evalRule(ruleObj, '0') + '$';

let partTwoAnswer = 0;
messages.forEach(message => {
  let check = message.search(regexp2);
  if (check === 0) {
    partTwoAnswer++;
  }
});
console.log('Part 2:', partTwoAnswer);
