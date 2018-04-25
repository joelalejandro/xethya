export default interface IConstructable<T> {
  new (...args: any[]): T;
}
