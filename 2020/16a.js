// let input = `mask = 000000000000000000000000000000X1001X
// mem[42] = 100
// mask = 00000000000000000000000000000000X0XX
// mem[26] = 1`;

// let input = document.querySelector('pre').innerText;

const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, '16_input.txt'), 'utf8');

let data = input.replace(/\r/g, '').split('\n\n');

let fieldRules = data[0].split('\n').map(x => x.split(/: | or |-/gm));
let yourTicket = data[1]
  .split('\n')
  .slice(1)[0]
  .split(',')
  .map(x => Number(x));
let nearbyTickets = data[2]
  .split('\n')
  .slice(1)
  .map(x => x.split(','));

console.log(fieldRules);
console.log(yourTicket);
console.log(nearbyTickets);

const passesRule = (value, rule) => {
  console.log(value, rule);
  // return  (rule[1] <= value && value <= rule[2]) || (rule[3] <= value && value <= rule[4])
};

const checkValidTicket = ticket => {
  let validCount = 0;
  ticket.forEach(value => {
    console.log(value);
    fieldRules.forEach(rule => {
      passesRule(value, rule);
    });
  });
};

let successfulTicketCount = 0;

nearbyTickets.forEach(ticket => {
  if (checkValidTicket(ticket)) {
    successfulTicketCount++;
  }
});

console.log('successfulTicketCount', successfulTicketCount);
