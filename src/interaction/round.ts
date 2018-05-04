import AbstractRound from './abstract-round';
import AbstractTurn from './abstract-turn';
import ITurn from './turn.i';

export default class Round<T extends ITurn> extends AbstractRound<T> {}
