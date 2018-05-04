import IEntity from '../entity/entity.i';
import ITurn from './turn.i';
import IConstructable from '../utils/constructable.i';

export default interface IRoundSettings<T extends ITurn> {
  entities: IEntity[];
  roundNumber: number;
  turnType: IConstructable<T>;
};
