import IEntity from '../entity/entity.i';
import ITurn from './turn.i';

export default interface IRoundSettings {
  entities: IEntity[];
  roundNumber: number;
  turnType: ITurn;
};