const fs = require('fs');
const path = require('path');

let testInput = `1 + 2 * 3 + 4 * 5 + 6`;

const puzzleInput = fs.readFileSync(
  path.resolve(__dirname, '18_input.txt'),
  'utf8'
);

const testProgram = true;
const input = testProgram ? testInput : puzzleInput;

let expression = input.replace(/\r| /g, '').split('');
console.log(expression);

const evalOperator = (valA, operator, valB) => {
  switch (operator) {
    case '+':
      return Number(valA) + Number(valB);
    case '*':
      return Number(valA) * Number(valB);
  }
};

const getBracketSection = expression => {
  let stack = [expression[0]];
  for (let index = 1; index < expression.length; index++) {
    if (expression[index] === '(') {
      stack.push('(');
    } else if (expression[index] === ')') {
      stack.pop();
    }
    if (stack.length === 0) {
      let bracketExpression = expression.slice(1, index);
      let remainingExpression = expression.slice(index);
      return [bracketExpression, remainingExpression];
    }
  }
};

const evalExpression = expression => {
  console.log('evalExpression', expression.length, expression);
  let valA;
  let operator;
  let valB;

  if (expression.length === 3) {
    valA = expression[0];
    operator = expression[1];
    valB = expression[2];
    return evalOperator(valA, operator, valB);
  }

  if (expression[0] === '(') {
    let bracketExpression = getBracketSection(expression);
    valA = evalExpression(bracketExpression);
  } else {
    valA = expression[0];
    operator = expression[1];
  }

  valA = expression[0];
  operator = expression[1];
  valB = expression[2];
  let calculation = [evalOperator(valA, operator, valB)];
  let remainingExpression = expression.slice(3);
  let newExpression = calculation.concat(remainingExpression);
  let newExpressionResult = evalExpression(newExpression);
  console.log('newExpressionResult', newExpressionResult);
  return newExpressionResult;
};

console.log('FINAL ANSWER', evalExpression(expression));
