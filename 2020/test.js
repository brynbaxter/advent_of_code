const fs = require('fs');
const path = require('path');

const testInput = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;
const testExpression = [testInput.replace(/\r| /g, '').split('')];

const puzzleInput = fs.readFileSync(
  path.resolve(__dirname, '18_input.txt'),
  'utf8'
);
const puzzleArr = puzzleInput.replace(/\r| /g, '').split('\n');
const puzzleNestedArr = puzzleArr.map(x => x.split(''));

const testProgram = true;
const expressionArr = testProgram ? testExpression : puzzleNestedArr;

const getBrackLength = section => {
  let stack = [section[0]];
  for (let index = 1; index < section.length; index++) {
    if (section[index] === '(') {
      stack.push('(');
    } else if (section[index] === ')') {
      stack.pop();
      if (stack.length === 0) {
        return index;
      }
    }
  }
};

const solveExpression = expression => {
  while (expression.length > 1) {
    let valA = Number(expression[0]);
    let operator = expression[1];
    let valB = Number(expression[2]);
    let firstTwoAnswer;
    if (operator === '+') {
      firstTwoAnswer = valA + valB;
    } else {
      firstTwoAnswer = valA * valB;
    }
    expression.shift();
    expression.shift();
    expression.shift();
    expression.unshift(firstTwoAnswer);
  }
  return parseInt(expression[0]);
};

const removeBrackets = expression => {
  let bracketCount = 0;
  expression.forEach(x => {
    if (x === '(') {
      bracketCount++;
    }
  });

  for (let i = 0; i < bracketCount; i++) {
    let brackIndexA = expression.indexOf('(');
    if (brackIndexA > -1) {
      let brackLength = getBrackLength(expression.slice(brackIndexA));
      let bracketContents = expression.slice(
        brackIndexA + 1,
        brackIndexA + brackLength
      );
      let brackResult = removeBrackets(bracketContents);

      let newExpression = [];
      newExpression = newExpression.concat(
        expression.slice(0, brackIndexA),
        brackResult,
        expression.slice(brackIndexA + brackLength + 1)
      );
      expression = newExpression;
    }
  }
  let answer = solveExpression(expression);
  return answer;
};

let answer = 0;
expressionArr.forEach(expression => {
  answer += removeBrackets(expression);
});
console.log('answer', answer);
