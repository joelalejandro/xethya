import { Dice } from '../dice';

export const enum CoinFlipSides {
  HEADS = 1,
  TAILS = 2,
};

export class CoinFlip extends Dice {
  constructor() {
    super({ faces: 2 });
  }
}