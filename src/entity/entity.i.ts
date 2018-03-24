import IHasAttributes from './attributes/has-attributes.i';
import IHasModifiers from './modifiers/has-modifiers.i';
import XethyaObject from '../base/object';

export default interface IEntity extends IHasAttributes, IHasModifiers, XethyaObject {
  id: string;
  name: string;
  volatile: boolean;
}