export default class Factory
{
  static create<T>(type: (new (...args: any[]) => T), ...args: any[]): T {
    return new type(...args);
  }
}
