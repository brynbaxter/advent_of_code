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

// console.log(successfulTicketCount, 'out of', nearbyTickets.length);
console.log('Part 1 Answer', scanningErrorRate);
// console.log('');

const createFieldObjectSet = () => {
  let ticketFields = {};
  let fieldSet = new Set();
  fieldRules.forEach(rule => {
    fieldSet.add(rule[0]);
  });

  for (let index = 0; index < fieldRules.length; index++) {
    ticketFields[index] = new Set(fieldSet);
  }
  return ticketFields;
};

const filterTicketFields = (fieldRules, validTickets, ticketFields) => {
  validTickets.forEach(ticket => {
    ticket.forEach((value, index) => {
      for (let i = 0; i < fieldRules.length; i++) {
        let rule = fieldRules[i];
        let passesRule = checkPassesRule(value, rule);
        if (!passesRule) {
          ticketFields[index].delete(fieldRules[i][0]);
        }
      }
    });
  });
  return ticketFields;
};

let ticketFields = createFieldObjectSet();
ticketFields = filterTicketFields(fieldRules, validTickets, ticketFields);

const removeDuplicates = ticketFields => {
  Object.keys(ticketFields).forEach(alpha => {
    if (ticketFields[alpha].size == 1) {
      let iterator = ticketFields[alpha].values();
      let itemToDelete = iterator.next().value;
      Object.keys(ticketFields).forEach(beta => {
        if (alpha !== beta) {
          ticketFields[beta].delete(itemToDelete);
        }
      });
    }
  });
  return ticketFields;
};

ticketFields = removeDuplicates(ticketFields);
ticketFields = removeDuplicates(ticketFields);
ticketFields = removeDuplicates(ticketFields);
ticketFields = removeDuplicates(ticketFields);
ticketFields = removeDuplicates(ticketFields);
ticketFields = removeDuplicates(ticketFields);
ticketFields = removeDuplicates(ticketFields);
ticketFields = removeDuplicates(ticketFields);

const bringEverythingTogether = (yourTicket, ticketFields) => {
  let answer = 1;
  yourTicket.forEach((field, index) => {
    let iterator = ticketFields[index].values();
    let setItem = iterator.next().value;
    let startsWithDeparture = setItem.split(' ')[0] == 'departure';
    if (startsWithDeparture) {
      answer *= parseInt(field);
    }
  });
  return answer;
};

const part2answer = bringEverythingTogether(yourTicket, ticketFields);
console.log('Part 2 Answer', part2answer);
