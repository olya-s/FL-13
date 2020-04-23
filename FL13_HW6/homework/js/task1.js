const hundredPercent = 100;
const numbersAfterComma = 2;
const number = parseFloat(prompt('enter number', ''));
const percentage = parseFloat(prompt('enter percentage', ''));
console.log(number, !number, percentage, !percentage);
if (
  isNaN(number) ||
  number < 0 ||
  isNaN(percentage) ||
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
