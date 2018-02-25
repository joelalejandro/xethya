export default class DiceThrowResult {
  rolls: number[];

  constructor() {
    this.rolls = [];
  }

  getRollSum(): number {
    return this.rolls.reduce((m, n) => m + n);
  }
}
