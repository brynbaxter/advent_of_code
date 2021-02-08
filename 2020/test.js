const fs = require('fs');
const path = require('path');

const getInput = () => {
  const testInput = `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`;
  const testExpression = [testInput.replace(/\r| /g, '').split('')];

  const puzzleInput = fs.readFileSync(
    path.resolve(__dirname, '18_input.txt'),
    'utf8'
  );
  const puzzleArr = puzzleInput.replace(/\r| /g, '').split('\n');
  const puzzleNestedArr = puzzleArr.map(x => x.split(''));

  const useTestInput = true;
  const expressionArr = useTestInput ? testExpression : puzzleNestedArr;
  return expressionArr;
};

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
  return parseInt(expression);
};

const solveAddOppFirst = expression => {
  console.log('Solve Add Operators First:', expression);
  while (expression.length > 1 && expression.indexOf('+') > -1) {
    addOppIndex = expression.indexOf('+');
    let sum =
      parseInt(expression[addOppIndex - 1]) +
      parseInt(expression[addOppIndex + 1]);
    if (addOppIndex === 1) {
      expression = [sum].concat(expression.slice(3));
    } else {
      expression = [].concat(
        expression.slice(0, addOppIndex - 1),
        sum,
        expression.slice(addOppIndex + 2)
      );
    }
  }

  let product = 1;
  console.log('Add Operators Solved', expression);
  if (typeof expression !== 'number') {
    expression.forEach(x => {
      if (x !== '*') {
        product *= x;
      }
    });
  } else {
    product = expression;
  }
  console.log('returned product', product);
  return product;
};

const removeBrackets = (expression, prioritiseAddOpperator) => {
  let bracketCount = 0;
  expression.forEach(x => {
    if (x === '(') {
      bracketCount++;
    }
  });

  console.log('with brackets', expression);

  let brackIndexA = expression.indexOf('(');
  if (brackIndexA !== -1) {
    for (let i = 0; i < bracketCount; i++) {
      if (brackIndexA > -1) {
        let brackLength = getBrackLength(expression.slice(brackIndexA));
        let bracketContents = expression.slice(
          brackIndexA + 1,
          brackIndexA + brackLength
        );
        let brackResult = removeBrackets(
          bracketContents,
          prioritiseAddOpperator
        );

        newExpression = expression
          .slice(0, brackIndexA)
          .concat(brackResult, expression.slice(brackIndexA + brackLength + 1));
        expression = newExpression;
      }
    }
  }

  console.log('without brackets', expression);

  let bracketlessExpression;

  if (prioritiseAddOpperator) {
    bracketlessExpression = solveAddOppFirst(expression);
  } else {
    bracketlessExpression = solveExpression(expression);
  }
  return bracketlessExpression;
};

// let expressionArr = getInput();
// let partOneAnswer = 0;
// expressionArr.forEach(expression => {
//   let bracketlessExpression = removeBrackets(expression, false);
//   partOneAnswer += solveExpression(bracketlessExpression);
// });
// console.log('Part 1:', partOneAnswer, '\n');

expressionArr = getInput();
let partTwoAnswer = 0;
expressionArr.forEach(expression => {
  let bracketlessExpression = removeBrackets(expression, true);
  partTwoAnswer += solveAddOppFirst(bracketlessExpression);
});
console.log('\nPart 2:', partTwoAnswer);
