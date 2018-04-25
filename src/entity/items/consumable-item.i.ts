import IItem from './item.i';
import TimeInterval from '../../utils/time/time-interval';

export default interface IConsumableItem extends IItem {
  duration: TimeInterval;
}
