import ITurn from "./turn.i";

export type TurnEvent<T = ITurn> = {
  (eventData: ITurnEvent<T>): void;
};

export interface ITurnEvent<T = ITurn> {
  turn: T;
};