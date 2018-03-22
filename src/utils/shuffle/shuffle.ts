import Collection from "../collection/collection";
import { BlumBlumShubAlgorithm } from "../../random/blum-blum-shub";
import IShuffledElement from "./shuffled-element.i";

const shuffleArray = <T>(list: T[]): T[] => {
  const randomizer = new BlumBlumShubAlgorithm();
  
  return list.map((element) => {
    return {
      element,
      shuffleIndex: randomizer.generateRandom(),
    } as IShuffledElement<T>;
  }).sort((leftElement: IShuffledElement<T>, rightElement: IShuffledElement<T>) => {
    if (leftElement.shuffleIndex < rightElement.shuffleIndex) {
      return 1;
    }

    if (leftElement.shuffleIndex > rightElement.shuffleIndex) {
      return -1;
    }

    return 0;
  }).map((shuffledElement) => shuffledElement.element);
};

const shuffleCollection = <T>(collection: Collection<T>): Collection<T> => {
  const shuffledCollection = new Collection<T>(collection.indexName);
  
  shuffledCollection.add(...shuffleArray(collection.getAll()));
  
  return shuffledCollection;
};

export {
  shuffleArray,
  shuffleCollection,
};