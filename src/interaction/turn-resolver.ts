import IConstructableTurn from './constructable-turn.i';

export default class TurnResolver<TurnType, TurnSettingsType> {
  constructor(private constructorFunction: IConstructableTurn<TurnType>) {}

  create(turnSettings: TurnSettingsType): TurnType {
    return new this.constructorFunction(turnSettings);
  }
}