export class ArrayUtils {
  static chunkArray<T>(myArray: Array<T>, chunk_size: number): Array<Array<T>> {
    let results: Array<Array<T>> = [];

    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }
    return results;
  }
}
