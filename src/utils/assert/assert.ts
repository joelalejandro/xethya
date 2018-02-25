import AssertionError from './assertion-error';

export default function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new AssertionError(message);
  }
}