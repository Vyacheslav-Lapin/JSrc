'use strict';

/**
 * Свойства с методами доступа имеют метод чтения и/или метод записи, а также атрибуты enumerable и configurable.
 * @interface
 * @extends Descriptor
 * @template T
 */
class PropertyDescriptor extends Descriptor {
    /** @returns {T} */ get() {}
    /** @param {T} t */ set(t) {}
}