'use strict';

/**
 * Свойства-данные имеют значение (value) и три атрибута: enumerable, writable и configurable.
 *
 * @interface
 * @extends Descriptor
 * @template T
 */
class FieldDescriptor extends Descriptor {
    constructor(){
        super();
        /** @type T       */ this.value = {};
        /** @type boolean */ this.writable = false;
    }
}