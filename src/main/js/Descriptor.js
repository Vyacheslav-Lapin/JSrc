'use strict';

/**
 * Дескриптор свойства – это обычный JavaScript-объект, описывающий атрибуты (и иногда значение) свойства.
 * @interface
 */
class Descriptor {
    constructor() {
        /** @type boolean */ this.enumerable = false;
        /** @type boolean */ this.configurable = false;
    }
}