function positiveSum(array) {
  return array.filter((item) => item > 0).reduce((sum, item) => sum + item, 0);
}
console.log(positiveSum([2, 4, 6, 8]));
console.log(positiveSum([0, -3, 5, 7]));
