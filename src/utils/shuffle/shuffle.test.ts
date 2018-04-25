import 'mocha';
import { expect } from 'chai';

import { shuffleArray, shuffleCollection } from './shuffle';
import Collection from '../collection/collection';

class MyItem {
  key: string;
  name: string;

  constructor(key: string, name: string) {
    this.key = key;
    this.name = name;
  }
}

const arrayOfNumbers = [10, 10, 3, 3, -5, 9, 2, 14, 1, 0, 0, -58, 13, 2, 8, 8];

let collection: Collection<MyItem>;
collection = Collection.fromArrayOf<MyItem>(
  [new MyItem('a', 'Alpha'),
   new MyItem('z', 'Zeta'),
   new MyItem('g', 'Gamma'),
   new MyItem('t', 'Tau'),
   new MyItem('s', 'Sigma'),
   new MyItem('d', 'Delta')],
  'key'
);

describe('Utils.Shuffle', () => {
  it('should shuffle an array', () => {
    const shuffledArrayOfNumbers = shuffleArray(arrayOfNumbers);

    expect(arrayOfNumbers.every(number => shuffledArrayOfNumbers.includes(number))).to.be.true;
    expect(arrayOfNumbers).to.not.deep.equal(shuffledArrayOfNumbers);
  });
  it('should shuffle a collection', () => {
    const shuffledCollection = shuffleCollection(collection);

    expect(shuffledCollection.getAllKeys().every(key => collection.contains(key))).to.be.true;
  });
  it('should not appear to alter order for same elements', () => {
    const elements = [0, 0, 0, 0];
    expect(shuffleArray(elements)).to.deep.equal(elements);
  });
});
