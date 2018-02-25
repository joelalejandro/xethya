import Range from '../../utils/range/range';

export default interface IRollScoreSettings {
  [index: string]: Range,
  
  failure: Range,
  success: Range,
  criticalSuccess: Range,
};