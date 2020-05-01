function isBigger(a, b) {
  return a > b;
}
function countPoints(gamesScores) {
  const sumOfPoints = gamesScores
    .map((i) => i.split(':'))
    .filter((i) => i[0] >= i[1])
    .map((i) => (isBigger(...i) ? 3 : 1))
    .reduce((sum, current) => sum + current, 0);
  return sumOfPoints;
}
console.log(
  countPoints([
    '3:1',
    '1:0',
    '0:0',
    '1:2',
    '4:0',
    '2:3',
    '1:1',
    '0:1',
    '2:1',
    '1:0',
  ])
);
console.log(
  countPoints([
    '1:1',
    '1:2',
    '2:0',
    '4:2',
    '0:1',
    '2:3',
    '1:1',
    '0:1',
    '1:1',
    '3:0',
  ])
);
