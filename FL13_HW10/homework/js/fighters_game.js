function Fighter(obj) {
  const name = obj.name;
  const damage = obj.damage;
  const strength = obj.strength;
  const agility = obj.agility;
  const totalHP = obj.hp;
  let currentHP = totalHP;
  let win = 0;
  let loss = 0;

  this.getName = () => name;
  this.getDamage = () => damage;
  this.getStrength = () => strength;
  this.getAgility = () => agility;
  this.getHealth = () => currentHP;

  this.attack = (defender) => {
    const PERCENTS = 100;
    const randomAttack = Math.floor(Math.random() * PERCENTS);
    const isSuccess =
      randomAttack > defender.getStrength() + defender.getAgility();
    if (isSuccess) {
      win++;
      defender.dealDamage(damage);
      defender.addLoss();
      console.log(`${name} makes ${damage} damage to ${defender.getName()}`);
    } else {
      console.log(`${name} attack missed`);
    }
  };

  this.logCombatHistory = () => {
    console.log(
      `Name: ${name}, Wins: ${win}, Losses: ${loss}, HP: ${currentHP}`
    );
  };

  this.heal = (hp) => {
    currentHP = currentHP + hp < totalHP ? currentHP + hp : totalHP;
  };

  this.dealDamage = (healthPoints) => {
    currentHP = currentHP - healthPoints > 0 ? currentHP - healthPoints : 0;
  };

  this.addWin = () => win++;
  this.addLoss = () => loss++;
}

function battle(fighter1, fighter2) {
  if (fighter1.getHealth() === 0) {
    console.log(`${fighter1.getName()} is dead and can't fight`);
  } else if (fighter2.getHealth() === 0) {
    console.log(`${fighter2.getName()} is dead and can't fight`);
  }
  while (fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {
    fighter1.attack(fighter2);
    if (fighter2.getHealth() <= 0) {
      console.log(`${fighter1.getName()} has won!`);
      break;
    }
    fighter2.attack(fighter1);
    if (fighter1.getHealth() <= 0) {
      console.log(`${fighter2.getName()} has won!`);
    }
  }
}

const fighter1 = new Fighter({
  name: 'Maximus',
  damage: 20,
  strength: 25,
  agility: 15,
  hp: 100
});
const fighter2 = new Fighter({
  name: 'Commodus',
  damage: 25,
  strength: 20,
  agility: 20,
  hp: 90
});

console.log('fighter1', fighter1);
console.log('fighter2', fighter2);
battle(fighter1, fighter2);
