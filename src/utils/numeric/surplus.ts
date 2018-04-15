export default function surplus(value: number, boundary: number): { remainder: number, surplusCount: number } {
  let surplusCount = 0;
  let remainder = value;

  while (remainder >= boundary) {
    remainder -= boundary;
    surplusCount += 1;
  }

  return {
    remainder,
    surplusCount,
  };
}
