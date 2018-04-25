import IWeapon from './weapon.i';

export default interface IHandheldWeapon extends IWeapon {
  isTwoHanded: boolean;
}
