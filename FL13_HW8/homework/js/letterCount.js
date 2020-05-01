function letterCount(string, occurrence) {
  return string.toLowerCase().split(occurrence.toLowerCase()).length - 1;
}
console.log(letterCount('Maggy', 'g'));
console.log(letterCount('Barry', 'b'));
console.log(letterCount('', 'z'));
