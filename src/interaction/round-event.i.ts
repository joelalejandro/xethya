import IRound from "./round.i";

export type RoundEvent<T = IRound> = {
  (eventData: IRoundEvent<T>): void;
};

export interface IRoundEvent<T = IRound> {
  round: T;
};