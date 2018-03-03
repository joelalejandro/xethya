import Stat from './stat';

type IStatCalculator = {(stat: Stat): number};

export default IStatCalculator;