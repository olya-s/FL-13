const Vehicle = function (color, engine) {
  this.color = color;
  this.engine = engine;
  this.speed = 0;
  this.maxSpeedDuringDrive = 0;
  this.maxSpeed = 70;
  this.isMoves = false;
  this.isDriving = false;
  this.isSlowsDown = false;

  this.showMessageAfterStopping = () =>
    console.log(
      `Vehicle is stopped. Maximum speed during the drive was ${this.maxSpeedDuringDrive}`
    );

  this.performIfSpeeding = () => {
    console.log("speed is too high, SLOW DOWN!");
  };
};

Vehicle.prototype.upgradeEngine = function (newEngine, maxSpeed) {
  if (!this.isMoves) {
    this.engine = newEngine;
    this.maxSpeed = maxSpeed;
  } else {
    console.log("Impossible upgrade while driving");
  }
};

Vehicle.prototype.getInfo = function () {
  return {
    engine: this.engine,
    color: this.color,
    maxSpeed: this.maxSpeed,
    model: this.model || "unknown model",
  };
};

Vehicle.prototype.drive = function () {
  const DELAY_TIME = 2000;
  this.isMoves = true;
  if (!this.isDriving) {
    this.isDriving = true;
    this.isSlowsDown = false;
    clearInterval(this.timerStopId);
    this.timerDriveId = setInterval(() => {
      this.speed += 20;
      this.maxSpeedDuringDrive = this.speed;
      console.log(this.speed);
      if (this.speed >= this.maxSpeed) {
        this.performIfSpeeding();
      }
    }, DELAY_TIME);
  } else {
    console.log("Already driving");
  }
};

Vehicle.prototype.stop = function () {
  const DELAY_TIME = 1500;
  this.isDriving = false;
  if (!this.isSlowsDown) {
    clearInterval(this.timerDriveId);
    this.timerStopId = setInterval(() => {
      this.speed -= 20;
      this.isSlowsDown = true;
      if (this.speed <= 0) {
        this.speed = 0;
        this.isMoves = false;
        this.isSlowsDown = false;
        clearInterval(this.timerStopId);
        this.showMessageAfterStopping();
      } else {
        console.log(this.speed);
      }
    }, DELAY_TIME);
  } else {
    console.log("Already slows down");
  }
};

const Car = function (model, color, engine) {
  Vehicle.call(this, color, engine);
  this.model = model;
  this.maxSpeed = 80;
  this.showMessageAfterStopping = () =>
    console.log(
      `Car ${this.model} is stopped. Maximum speed during the drive was ${this.maxSpeedDuringDrive}`
    );
};

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.changeColor = function (newColor) {
  if (!this.isMoves) {
    if (this.color !== newColor) {
      this.color = newColor;
    } else {
      console.log(
        "The selected color is the same as the previous, please choose another one"
      );
    }
  } else {
    console.log("Impossible change while driving");
  }
};

const Motorcycle = function (model, color, engine) {
  Vehicle.call(this, color, engine);
  this.model = model;
  this.maxSpeed = 90;
  this.isOverheating = false;
  this.showMessageAfterStopping = () =>
    console.log(`Motorcycle ${this.model} is stopped. Good drive`);

  this.performIfSpeeding = (DELAY_TIME) => {
    const SPEED_DIFFERENCE = 30;
    if (this.speed >= this.maxSpeed && !this.isOverheating) {
      console.log("speed is too high, SLOW DOWN!");
      if (this.speed - this.maxSpeed >= SPEED_DIFFERENCE) {
        console.log("Engine overheating");
        this.isOverheating = true;
        setTimeout(() => {
          clearInterval(this.timerDriveId);
          this.stop();
          this.isOverheating = false;
          this.isSlowsDown = true;
          this.isDriving = false;
        }, DELAY_TIME);
      }
    }
  };
};

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;

Motorcycle.prototype.drive = function () {
  console.log("Let's drive");
  Vehicle.prototype.drive.call(this);
};
