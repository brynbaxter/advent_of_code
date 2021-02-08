const fs = require('fs');
const path = require('path');

let testInput = `1 + (2 * 3) + (4 * (5 + 6))`;

const puzzleInput = fs.readFileSync(
  path.resolve(__dirname, '18_input.txt'),
  'utf8'
);

const testProgram = true;
const input = testProgram ? testInput : puzzleInput;

let expression = input.replace(/\r| /g, '').split('');

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
  ogExpressionLength = expression.length;
  for (let i = 0; i < (ogExpressionLength - 1) / 2; i++) {
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

const solveBrackets = expression => {
  console.log(expression.join(' '));
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
      console.log('brackIndexA', brackIndexA, 'brackLength', brackLength);
      let bracketContents = expression.slice(
        brackIndexA + 1,
        brackIndexA + brackLength
      );
      let brackResult = solveBrackets(bracketContents);

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

let answer = solveExpression(expression);
console.log('answer', answer);
