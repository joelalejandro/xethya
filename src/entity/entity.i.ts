import IHasAttributes from './attributes/has-attributes.i';
import IHasModifiers from './modifiers/has-modifiers.i';
import Eventable from '../base/eventable';

export default interface IEntity extends IHasAttributes, IHasModifiers, Eventable {
  id: string;
  name: string;
  volatile: boolean;
}