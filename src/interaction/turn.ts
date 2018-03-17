import XethyaObject from '../base/object';
import Entity from '../entity/entity';
import { AbleEntity } from '../entity/able-entity';

export type TurnSettings = {
  entity: AbleEntity,
  turnNumber: number,
};

export class Turn extends XethyaObject {
  entity: AbleEntity;
  turnNumber: number;
  action: string | null;
  validTargets: Entity[];

  constructor({
    entity,
    turnNumber
  }: TurnSettings) {
    super();
    
    this.entity = entity;
    this.turnNumber = turnNumber;
    this.action = null;
    this.validTargets = [];
  }

  isResolved() {
    return this.action !== null;
  }

  begin() {
    this.emit('begin', { turn: this });
  }

  end() {
    this.emit('end', { turn: this });
  }
}