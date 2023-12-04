const data = require('./data/data.json');

const results = [];
let sum = 0;

const getAllDigits = new RegExp(/\d/g);

data.input.map((item) => {
    const digits = item.match(getAllDigits);
    const lastDigit = digits[digits.length - 1]
    results.push(digits[0] + lastDigit);
});

results.map((number) => {
    sum = parseInt(sum) + parseInt(number);
});

console.log('sum: ', sum);