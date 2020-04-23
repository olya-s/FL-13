let word = prompt('enter word');
const half = 2;
if (word === 0) {
  alert('invalid value');
} else {
  if (word.length % half === 0) {
    alert(word.slice([word.length / half] - 1, word.length / half + 1));
  } else {
    alert(word[(word.length - 1) / half]);
  }
}
