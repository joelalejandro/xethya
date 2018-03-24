import IConstructableTurn from './constructable-turn.i';
export default class TurnResolver<TurnType, TurnSettingsType> {
    private constructorFunction;
    constructor(constructorFunction: IConstructableTurn<TurnType>);
    create(turnSettings: TurnSettingsType): TurnType;
}
