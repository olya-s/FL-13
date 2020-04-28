const users = {
  User: 'UserPassw',
  Admin: 'RootPassw'
};
const login = prompt('enter login', '');
const inputLength = 4;
if (!login) {
  alert('Canceled');
} else if (login.length < inputLength) {
  alert('I don\'t know any users having name length less than 4 symbols');
} else if (users[login]) {
  const passw = prompt('enter password', '');
  if (!passw) {
    alert('Canceled');
  } else {
    if (users[login] === passw) {
      const currentTime = new Date().getHours();
      const morningTime = 8;
      const eveningTime = 20;
      if (currentTime < eveningTime && currentTime > morningTime) {
        alert(`Good day, dear ${login}!`);
      } else {
        alert(`Good evening, dear ${login}!`);
      }
    } else {
      alert('Wrong password');
    }
  }
} else {
  alert('I don\'t know you');
}
