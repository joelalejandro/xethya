import { AbleEntity, IAbleEntitySettings } from './able-entity';
import { Race } from './race/race';
import { Attribute } from './attributes/attribute';
import Modifier from './modifiers/modifier';
import Stat from './stats/stat';
import StatCollection from './stats/stat-collection';
import IHasStats from './stats/has-stats.i';
import { Skill } from './skills/skill';

export interface ILivingEntitySettings extends IAbleEntitySettings {
  race: Race;
  age: number;
  height: number;
  weight: number;
  stats: Stat[];
}

export class LivingEntity extends AbleEntity implements IHasStats {
  protected _race: Race;
  protected _age: number;
  protected _height: number;
  protected _weight: number;
  protected _stats: StatCollection;

  constructor(settings: ILivingEntitySettings) {
    super(settings);

    this._race = settings.race;
    this._age = settings.age;
    this._weight = settings.weight;
    this._height = settings.height;

    this._stats = StatCollection.fromArray(settings.stats);

    this._applyRacialTraits();
  }

  get stats() {
    return this._stats;
  }

  get race() {
    return this._race;
  }

  get age() {
    return this._age;
  }

  get height() {
    return this._height;
  }

  get weight() {
    return this._weight;
  }

  protected _applyRacialTraits(): void {
    this._applyRaceAttributes();
    this._applyRaceStats();
    this._applyRaceSkills();
  }

  protected _applyRaceAttributes(): void {
    this._race.attributes.getAll().forEach((attribute) => {
      const raceTrait = new Modifier(
        `${attribute.id}RaceTrait`,
        attribute.rawValue
      );
      (this.attributes.get(attribute.id) as Attribute).modifiers.add(raceTrait);
    });
  }

  protected _applyRaceStats(): void {
    this.race.stats.getAll().forEach((stat) => {
      const raceTrait = new Modifier(
        `${stat.id}RaceTrait`,
        stat.value
      );
      (this.stats.get(stat.id) as Stat).modifiers.add(raceTrait);
    });
  }


  protected _applyRaceSkills(): void {
    this.race.skills.getAll().forEach((skill) => {
      const raceTrait = new Modifier(
        `${skill.id}RaceTrait`,
        skill.value
      );
      (this.skills.get(skill.id) as Skill).modifiers.add(raceTrait);
    });
  }  
}