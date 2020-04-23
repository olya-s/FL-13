const hundredPercent = 100;
const numbersAfterComma = 2;
const number = +prompt('enter number');
const percentage = +prompt('enter percentage');
if (
  !number ||
  number < 0 ||
  !percentage ||
  percentage < 0 ||
  percentage > hundredPercent
) {
  alert('Invalid input data');
} else {
  const amount = percentage * number / hundredPercent;
  const totalSum = number + amount;
  const result =
    'Check number: ' +
    number +
    '\n' +
    'Tip: ' +
    percentage +
    '%' +
    '\n' +
    'Tip amount: ' +
    amount.toFixed(numbersAfterComma) +
    '\n' +
    'Total sum to pay: ' +
    totalSum.toFixed(numbersAfterComma);
  alert(result);
}
