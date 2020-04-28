let play = confirm('Do you want to play a game?');
if (play) {
  const minNumber = 0,
    initialMaxNumber = 5,
    initialStartRate = 100,
    rateIncrease = 2,
    maxNumberIncrease = 5;
  let maxNumber = initialMaxNumber,
    startRate = initialStartRate,
    totalPrize = 0,
    currentTotalPrize = 0;
  while (play) {
    let rate = startRate;
    totalPrize = totalPrize + currentTotalPrize;
    const number = Math.floor(
      Math.random() * Math.floor(maxNumber) - Math.ceil(minNumber) + 1
    );
    console.log('number: ', number);
    for (let i = 3; i > 0; i--) {
      let userNumber = parseInt(
        prompt(
          `Choose a roulette pocket number from 0 to ${maxNumber}
Attempts left: ${i}
Total prize: ${totalPrize}
Possible prize of current attempt: ${rate}`,
          ''
        )
      );
      if (userNumber === number) {
        currentTotalPrize = currentTotalPrize + rate;
        totalPrize = totalPrize + currentTotalPrize;
        let proceed = confirm(
          `Congratulation, you won! Your prize is: ${totalPrize} $. Do you want to continue?`
        );
        if (proceed) {
          startRate = startRate * rateIncrease;
          maxNumber = maxNumber + maxNumberIncrease;
          break;
        } else {
          maxNumber = initialMaxNumber;
          startRate = initialStartRate;
          currentTotalPrize = 0;
          alert(
            `Thank you for your participation. Your prize is: ${totalPrize} $`
          );
          play = confirm('Do you want to play again?');
          break;
        }
      } else if (i === 1) {
        startRate = initialStartRate;
        maxNumber = initialMaxNumber;
        currentTotalPrize = 0;
        alert(
          `Thank you for your participation. Your prize is: ${totalPrize} $`
        );
        play = confirm('Do you want to play again?');
        break;
      } else {
        rate = rate / rateIncrease;
      }
    }
  }
} else {
  alert('You did not become a billionaire, but can.');
}
