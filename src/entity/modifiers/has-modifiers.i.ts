import Modifier from './modifier';
import Collection from '../../utils/collection/collection';
import ModifierCollection from './modifier-collection';

export default interface IHasModifiers {
  modifiers: ModifierCollection | Collection<Modifier>;
}