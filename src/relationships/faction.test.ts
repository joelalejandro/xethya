import 'mocha';
import { expect } from 'chai';

import Faction from './faction';
import { FactionRelationshipStatus } from './faction-relationship-status';

let faction: Faction;
let alliedFaction: Faction;
let neutralFaction: Faction;
let enemyFaction: Faction;

describe('Relationships.Faction', () => {
  beforeEach(() => {
    faction = new Faction({
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
    alliedFaction = new Faction({ id: 'west', name: 'Western' });
    neutralFaction = new Faction({ id: 'south', name: 'Southern' });
    enemyFaction = new Faction({ id: 'east', name: 'Eastern' });

    faction.addAlliedRelationship(alliedFaction);
    expect(faction.getAlliedFactions()).to.contain(alliedFaction);

    faction.addNeutralRelationship(neutralFaction);
    expect(faction.getNeutralFactions()).to.contain(neutralFaction);

    faction.addEnemyRelationship(enemyFaction);
    expect(faction.getEnemyFactions()).to.contain(enemyFaction);
  });
  it('should group relationships if they are set via #allRelationships', () => {
    alliedFaction = new Faction({ id: 'west', name: 'Western' });
    neutralFaction = new Faction({ id: 'south', name: 'Southern' });
    enemyFaction = new Faction({ id: 'east', name: 'Eastern' });

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