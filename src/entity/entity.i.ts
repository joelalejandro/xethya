import IHasAttributes from './attributes/has-attributes.i';
import IHasModifiers from './modifiers/has-modifiers.i';
import XethyaObject from '../base/object';
import IIdentifiable from './identifiable.i';

export default interface IEntity extends IIdentifiable, IHasAttributes, IHasModifiers, XethyaObject {
  name: string;
  volatile: boolean;
}
