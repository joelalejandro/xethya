import Stat from './stat';
import StatCollection from './stat-collection';
import Collection from '../../utils/collection/collection';

export default interface IHasStats {
  stats: StatCollection | Collection<Stat>
};