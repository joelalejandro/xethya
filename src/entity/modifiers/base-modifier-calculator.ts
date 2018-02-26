export function BaseModifierCalculator(value: number) {
  return Math.floor((value - 10) / 2);
}

export type IBaseModifierCalculator = {(value: number): number};