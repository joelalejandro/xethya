import { EventEmitter } from 'eventemitter3';

export default function Eventable(target: Function) {
  Object.assign(
    target.prototype,
    new EventEmitter(),
    EventEmitter.prototype,
  );  
}