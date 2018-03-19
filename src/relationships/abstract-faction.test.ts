import 'mocha';
import { expect } from 'chai';

import AbstractFaction from './abstract-faction';
import { FactionRelationshipStatus } from './faction-relationship-status';

class MyFaction extends AbstractFaction {}

let faction: MyFaction;
let alliedFaction: MyFaction;
let neutralFaction: MyFaction;
let enemyFaction: MyFaction;

describe('Relationships.AbstractFaction', () => {
  beforeEach(() => {
    faction = new MyFaction({
      id: 'north',
      name: 'Northern',
    });
  });
  it('should create a faction with the expected input', () => {
    expect(faction.id).to.equal('north');
    expect(faction.name).to.equal('Northern');
    expect(faction.allRelationships.length).to.equal(0);
    expect(faction.relationshipsByStatus).to.be.empty;
  });
  it('should group relationships as soon as they are added', () => {
    alliedFaction = new MyFaction({ id: 'west', name: 'Western' });
    neutralFaction = new MyFaction({ id: 'south', name: 'Southern' });
    enemyFaction = new MyFaction({ id: 'east', name: 'Eastern' });

    faction.addAlliedRelationship(alliedFaction);
    expect(faction.getAlliedFactions()).to.contain(alliedFaction);

    faction.addNeutralRelationship(neutralFaction);
    expect(faction.getNeutralFactions()).to.contain(neutralFaction);

    faction.addEnemyRelationship(enemyFaction);
    expect(faction.getEnemyFactions()).to.contain(enemyFaction);
  });
  it('should group relationships if they are set via #allRelationships', () => {
    alliedFaction = new MyFaction({ id: 'west', name: 'Western' });
    neutralFaction = new MyFaction({ id: 'south', name: 'Southern' });
    enemyFaction = new MyFaction({ id: 'east', name: 'Eastern' });

    faction.allRelationships = [
      { faction: alliedFaction, relationshipStatus: FactionRelationshipStatus.ALLY },
      { faction: neutralFaction, relationshipStatus: FactionRelationshipStatus.NEUTRAL },
      { faction: enemyFaction, relationshipStatus: FactionRelationshipStatus.ENEMY },
    ];

    expect(faction.getAlliedFactions()).to.contain(alliedFaction);
    expect(faction.getNeutralFactions()).to.contain(neutralFaction);
    expect(faction.getEnemyFactions()).to.contain(enemyFaction);
  });
});