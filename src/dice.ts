export class Dice {
  limit: number;
  value: number = 0;
  history: number[] = [];

  constructor(limit: number = 6) {
    this.limit = limit;
  }

  roll(): number {
    this.value = Math.round(Math.random() * this.limit);
    this.history.push(this.value);

    return this.value;
  }

  getHistory(): number[] {
    return this.history;
  }
}

if(typeof(module) !== "undefined"){
    module.exports = Dice;
}