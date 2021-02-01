const fs = require('fs');
const path = require('path');

let testInput = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

const puzzleInput = fs.readFileSync(
  path.resolve(__dirname, '16_input.txt'),
  'utf8'
);

const testProgram = false;
const input = testProgram ? testInput : puzzleInput;

let data = input.replace(/\r/g, '').split('\n\n');

let fieldRules = data[0]
  .split('\n')
  .map(x => x.split(/: | or |-/gm))
  .map(x => {
    return x.map(y => {
      if (isNaN(y)) {
        return y;
      } else {
        return Number(y);
      }
    });
  });
let yourTicket = data[1]
  .split('\n')
  .slice(1)[0]
  .split(',')
  .map(x => Number(x));
let nearbyTickets = data[2]
  .split('\n')
  .slice(1)
  .map(x => x.split(','))
  .map(y => {
    return y.map(z => parseInt(z));
  });

const checkPassesRule = (value, rule) => {
  let passesRulePartA = rule[1] <= value && value <= rule[2];
  let passesRulePartB = rule[3] <= value && value <= rule[4];
  let passes = passesRulePartA || passesRulePartB;
  return passes;
};

let scanningErrorRate = 0;

const checkValidTicket = ticket => {
  let validCount = 0;
  ticket.forEach(value => {
    let rulesPassed = 0;
    for (let i = 0; i < fieldRules.length; i++) {
      let rule = fieldRules[i];
      let passesRule = checkPassesRule(value, rule);
      if (passesRule) {
        validCount++;
        rulesPassed++;
        break;
      }
    }
    if (rulesPassed == 0) {
      scanningErrorRate += value;
    }
  });
  return validCount === ticket.length;
};

let successfulTicketCount = 0;
let validTickets = [];

nearbyTickets.forEach(ticket => {
  if (checkValidTicket(ticket)) {
    successfulTicketCount++;
    validTickets.push(ticket);
  }
});

console.log(successfulTicketCount, 'out of', nearbyTickets.length);
console.log('scanningErrorRate', scanningErrorRate);
