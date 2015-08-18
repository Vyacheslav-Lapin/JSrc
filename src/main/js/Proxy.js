'use strict';

/**
 * Объект <code>Proxy</code> используется для определения custom behavior for fundamental operations (e.g. property lookup,
 * assignment, enumeration, function invocation, etc).
 *
 * @class
 * @template T
 * @param {T} target целевой объект (может быть любым сортом объектов, в том числе нативный массив, функция или даже
 * другой <code>Proxy</code>) или функция для заворачивания в <code>Proxy</code>.
 * @param {ProxyHandler<T>} handler объект, свойствами которого являются функции, которые определяют поведение прокси
 * когда операция выполняется на ней.
 *
 * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[HasProperty]]':
 * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver}
 */
const Proxy = ((TARGET, HANDLER) => class Proxy {
    constructor(target, handler) {
        this[TARGET] = target;
        this[HANDLER] = handler;
    }

    /**
     * Метод <code>Proxy.revocable()</code> используется для создания отменяемого (revocable) объекта
     * <code>{@link Proxy}</code>. A revocable Proxy is an object with following two properties
     * <code>{proxy: proxy, revoke: revoke}</code>.
     *
     * @example
     * var revocable = Proxy.revocable({}, { get: function(target, name) { return "[[" + name + "]]"; }}),
     *     proxy = revocable.proxy;
     * console.log(proxy.foo); // "[[foo]]"
     * revocable.revoke();
     *
     * console.log(proxy.foo); // Возбуждается TypeError
     * proxy.foo = 1           // Снова возбуждается TypeError
     * delete proxy.foo;       // Всё ещё возбуждается TypeError
     * typeof proxy            // "object", typeof не перехватывается ни одним методом-ловушкой
     *
     * @template T
     * @param {T} target Целевой объект (может быть любым типом объектов, включая массив, функцию и даже другой Proxy)
     * или функция для оборачивания её проксёй.
     * @param {ProxyHandler<T>} handler Объект, свойства которого являются функциями, определяющими поведение прокси при
     * вызове операции на ней.
     * @returns {RevocableProxy<T>} Новый созданный аннулируемый объект прокси.
     *
     * @see Proxy
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание 'Proxy Revocation Functions':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy.revocable}
     */
    static revocable(target, handler) {
        return /** @type RevocableProxy<T> */ {
            proxy: new Proxy(target, handler),
            revoke: () => {
                // TODO: Реализовать!
            }
        };
    }

})(Symbol('target'), Symbol('handler'));