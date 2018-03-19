import ICombatSimulation from './combat-simulation.i';

type ICombatValidator = {(combat: ICombatSimulation): boolean};

export default ICombatValidator;