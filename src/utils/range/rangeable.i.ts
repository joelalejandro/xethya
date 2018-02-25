import Range from "./range";

export default interface IRangeable {
  getRange(): Range;
  setRange(lowerBound: number, upperBound: number): void;
}