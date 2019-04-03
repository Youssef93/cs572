const events = require("events");

class Gym extends events {
  constructor() {
    super();
    setInterval(() => {
      this.emit("boom");
    }, 1000);
  }
}

const gym = new Gym();
gym.on("boom", () => {
  console.log("Athlete is working out");
});
