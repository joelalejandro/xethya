import assert from '../../utils/assert/assert';
import Eventable from '../../base/eventable';

export default class Modifier extends Eventable {
  private _id: string = '';
  private _value: number = 0;
  private _active: boolean = true;
  private _source: any;

  constructor(id: string, value: number = 0, source: any = undefined) {
    super();
  
    this.id = id;
    this.source = source;
    this._value = value;
  }

  get id() {
    return this._id;
  }

  set id(newId: string) {
    assert(newId !== '', 'Modifier#set[id]: cannot be an empty String');

    this._id = newId;
  }

  get active() {
    return this._active;
  }

  set active(newValue: boolean) {
    if (this._active !== newValue) {
      this._active = newValue;
      this.emit(newValue ? 'activate' : 'deactivate', this);
      this.emit('change:active', this);
    }
  }

  get value() {
    return this._value;
  }

  set value(newValue: number) {
    if (this._value !== newValue) {
      const previousValue: number = this._value;
      this.emit('before:change:value', {
        previousValue,
        newValue,
      });
      this._value = newValue;
      this.emit('change:value', this);
    }
  }

  get source() {
    return this._source;
  }

  set source(newSource) {
    this._source = newSource;
  }
}