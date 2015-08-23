/**
 * @interface
 * @template T
 */
class Iterable {

    /**
     * @returns {Iterator<T>}
     */
    [Symbol.iterator]() {}
}