import { Attribute } from './attribute';
import Collection from '../../utils/collection/collection';
import AttributeCollection from './attribute-collection';

export default interface IHasAttributes {
  attributes: AttributeCollection | Collection<Attribute>;
}