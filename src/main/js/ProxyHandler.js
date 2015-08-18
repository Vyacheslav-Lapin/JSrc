'use strict';

/**
 * @template T
 * @interface
 */
class ProxyHandler {

    /**
     * Метод <code>ProxyHandler.getPrototypeOf()</code> является ловушкой для внутреннего метода
     * <code>[[GetPrototypeOf]]</code>. Т.е. данный метод-ловушка может перехватывать следующие вызовы и операции:
     * <code class="javascript"><ul>
     *     <li>{@link Object#getPrototypeOf}()</li>
     *     <li>{@link Reflect#getPrototypeOf}()</li>
     *     <li>{@link Object#__proto__}</li>
     *     <li>{@link Object#isPrototypeOf}()</li>
     *     <li>instanceof</li>
     * </ul></code>
     *
     * <h2>Инварианты</h2>
     * Если какой-либо из нижеперечисленных инвариантов не выполняется в отношении реализации данного метода, класс
     * <code>{@link Proxy}</code> после выполнения метода возбудит исключение <code>{@link TypeError}</code>:
     * <ul>
     *     <li>Метод <code>getPrototypeOf</code> должен возвращать объект или <code>null</code>.</li>
     *     <li>Если целевой объект не расширяем (not extensible), <code>{@link Object#getPrototypeOf}(proxy)</code>
     *     метод должен возвращать то же значение, что и <code>{@link Object#getPrototypeOf}(target)</code>.</li>
     * </ul>
     *
     * @example
     * // Простейшее использование
     * const obj = {},
     *     proto = {},
     *     p = new Proxy(obj, {
     *             getPrototypeOf(target) {
     *                 console.log(
     *                     target === obj,    // true
     *                     this === handler); // true
     *                 return proto;}});
     * console.log(Object.getPrototypeOf(p) === proto); // true
     *
     * // Пять способов среагировать на вызов getPrototypeOf:
     * const p = new Proxy({}, { getPrototypeOf(target) { return Array.prototype; } });
     * console.log(
     *     Object.getPrototypeOf(p) === Array.prototype,  // true
     *     Reflect.getPrototypeOf(p) === Array.prototype, // true
     *     p.__proto__ === Array.prototype,               // true
     *     Array.prototype.isPrototypeOf(p),              // true
     *     p instanceof Array);                           // true
     *
     * // Two kinds of exceptions:
     * Object.getPrototypeOf(
     *     new Proxy({}, { getPrototypeOf(target) { return "foo"; }})); // TypeError: "foo" is not an object or null
     *
     * Object.getPrototypeOf(
     *     new Proxy(Object.preventExtensions({}), { getPrototypeOf(target) { return {}; }})
     * ); // TypeError: expected same prototype value
     *
     * @param {T} target Целевой объект.
     * @returns {*} объект или <code>null</code> (что будет означать, что прототипа у объекта нет).
     *
     * @see Proxy
     * @see Object#getPrototypeOf
     * @see Reflect#getPrototypeOf
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[GetPrototypeOf]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-getprototypeof}
     */
    getPrototypeOf(target) {}

    /**
     * Метод <code>ProxyHandler.setPrototypeOf()</code> является ловушкой для вызова метода
     * <code>[[SetPrototypeOf]]</code>. Как следствие, осуществляется перехват вызовов
     * <code>{@link Object#setPrototypeOf}()</code> и <code>{@link Reflect#setPrototypeOf}()</code>.
     *
     * <h2>Инвариант</h2>
     * Если <em>target</em> является не расширяемым (not extensible), параметр <em>prototype</em> должен быть тем же
     * значением, что и <code>{@link Object#getPrototypeOf}(target)</code>, иначе класс <code>{@link Proxy}</code> после
     * выполнения метода возбудит исключение <code>{@link TypeError}</code>.
     *
     * @param {T} target целевой объект
     * @param {*} prototype новый прототип объекта или <code>null</code>
     *
     * @see Proxy
     * @see Object#setPrototypeOf
     * @see Reflect#setPrototypeOf
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[SetPrototypeOf]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-setprototypeof-v
     */
    setPrototypeOf(target, prototype) {}

    /**
     * Метод <code>ProxyHandler.isExtensible()</code> является ловушкой для вызова <code>[[IsExtensible]]</code>. Как
     * следствие, осуществляется перехват вызовов <code>{@link Object#isExtensible}()</code> и
     * <code>{@link Reflect#isExtensible}()</code>.
     *
     * <h2>Инвариант</h2>
     * Метод <code>{@link Object#isExtensible}(proxy)</code> должен возвращать то же значение, что и
     * <code>{@link Object#isExtensible}(target)</code>, иначе класс <code>{@link Proxy}</code> после выполнения метода
     * возбудит исключение <code>{@link TypeError}</code>.
     *
     * @example
     * // Данный код ловит вызов Object.isExtensible():
     * var p = new Proxy({}, { isExtensible: function(target) { console.log("called"); return true; }});
     * console.log(Object.isExtensible(p)); // "called", true
     *
     * // Данный код нарушает инвариант:
     * var p = new Proxy({}, { isExtensible: function(target) { return false; } });
     * Object.isExtensible(p); // Бросает TypeError
     *
     * @param {T} target целевой объект
     * @returns {boolean}
     *
     * @see Proxy
     * @see Object#isExtensible
     * @see Reflect#isExtensible
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[IsExtensible]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-isextensible}
     */
    isExtensible(target) {}

    /**
     * Метод <code>ProxyHandler.preventExtensions()</code> является ловушкой для вызова
     * <code>[[PreventExtensions]]</code>. Как следствие, осуществляется перехват вызовов
     * <code>{@link Object#preventExtensions}()</code> и <code>{@link Reflect#preventExtensions}()</code>.
     *
     * <h2>Инвариант</h2>
     * Метод <code>{@link Object#preventExtensions}(proxy)</code> должен возвращать <code>true</code> только если
     * <code>{@link Object#isExtensible}(proxy)</code> возвращает <code>false</code>, иначе класс
     * <code>{@link Proxy}</code> после выполнения метода возбудит исключение <code>{@link TypeError}</code>.
     *
     * @example
     * // Данный код ловит вызов Object.preventExtensions()
     * var p = new Proxy({}, {
     *     preventExtensions: function(target) { console.log("called"); Object.preventExtensions(target); return true;}
     * });
     * console.log(Object.preventExtensions(p)); // "called", false
     *
     * // Данный код нарушает инвариант:
     * var p = new Proxy({}, { preventExtensions: function(target) { return true; } });
     * Object.preventExtensions(p); // Бросает TypeError
     *
     * @param {T} target целевой объект
     * @returns {boolean}
     *
     * @see Proxy
     * @see Object#preventExtensions
     * @see Reflect#preventExtensions
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[PreventExtensions]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-preventextensions}
     */
    preventExtensions(target) {}

    /**
     * Метод <code>ProxyHandler.getOwnPropertyDescriptor</code> является ловушкой для вызова внутреннего метода
     * <code>[[GetOwnProperty]]</code>. Как следствие, им осуществляется перехват вызовов
     * <code>{@link Object#getOwnPropertyDescriptor}()</code> и <code>{@link Reflect#getOwnPropertyDescriptor}()</code>.
     *
     * <h2>Инварианты</h2>
     * Если какой-либо из нижеперечисленных инвариантов не выполняется в отношении реализации данного метода, класс
     * <code>{@link Proxy}</code> при возврате значения из метода возбудит исключение <code>{@link TypeError}</code>:
     * <ul>
     *     <li><code>getOwnPropertyDescriptor</code> должен возвращать объект или <code>undefined</code></li>
     *     <li>Свойство не может быть описано как не существующее, если оно существует как не конфигурируемое
     *     (non-configurable) собственное свойство целевого объекта.</li>
     *     <li>Свойство не может быть описано как не существующее, если оно существует как собственное свойство не
     *     расширяемого (not extensible) целевого объекта.</li>
     *     <li>Свойство не может быть описано как существующее, если оно не существует как собственное свойство не
     *     расширяемого (not extensible) целевого объекта.</li>
     *     <li>Свойство не может быть описано как не конфигурируемое (non-configurable), если оно не существует как
     *     собственное свойство целевого объекта или если оно существует как конфигуриуемое собственное свойство
     *     целевого объекта.</li>
     *     <li>Возвращаемый результат вызова <code>{@link Object#getOwnPropertyDescriptor}(target)</code> может быть
     *     применён к целевому объекту при помощи вызова <code>{@linl Object#defineProperty}</code> и не приведёт к
     *     возбуждению (throw) исключения (exception).</li>
     * </ul>
     *
     * @example
     * // The following code traps Object.getOwnPropertyDescriptor().
     * const p = new Proxy({ a: 20 }, {
     *     getOwnPropertyDescriptor: function(target, prop) {
     *         console.log("called: " + prop);
     *         return { configurable: true, enumerable: true, value: 10 };
     *     }
     * });
     * console.log(Object.getOwnPropertyDescriptor(p, "a").value); // "called: a", 10
     *
     * // The following code violates an invariant.
     * const obj = Object.preventExtensions({ a: 10 }),
     *     p = new Proxy(obj, { getOwnPropertyDescriptor: function(target, prop) { return undefined; }});
     * Object.getOwnPropertyDescriptor(p, "a"); // TypeError is thrown
     *
     * @template V
     * @param {T} target целевой объект
     * @param {string} propertyName имя свойства, описание которого ожидается как результат вызова.
     * @returns {PropertyDescriptor<V>|FieldDescriptor<V>|undefined}
     *
     * @see Proxy
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[GetOwnProperty]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-getownproperty-p}
     */
    getOwnPropertyDescriptor(target, propertyName) {}

    /**
     * Метод <code>ProxyHandler.defineProperty</code> является ловушкой для вызова внутреннего метода
     * <code>[[DefineOwnProperty]]</code>. Как следствие, им осуществляется перехват вызовов
     * <code>{@link Object#defineProperty}()</code> и <code>{@link Reflect#defineProperty}()</code>.
     *
     * <h2>Инварианты</h2>
     * Если какой-либо из нижеперечисленных инвариантов не выполняется в отношении реализации данного метода, класс
     * <code>{@link Proxy}</code> при возврате значения из метода возбудит исключение <code>{@link TypeError}</code>:
     * <ul>
     *     <li>Свойство не может быть добавлено, если <em>target</em> не расширяем (not extensible).</li>
     *     <li>Свойство не может быть добавлено или модифицировано так, что бы стать неконфигуриуемым
     *     (non-configurable), если не существует неконфигурируемого собственного свойства с таким именем у целевого
     *     объекта.</li>
     *     <li>Свойство не может быть некофигурируемым (non-configurable), если соответствующее конфигурируемое свойство
     *     целевого объекта существует.</li>
     *     <li>Если соответствующее свойство имеется у целевого объекта, то
     *     <code>{@link Object#defineProperty}(target, prop, descriptor)</code> не должно возбуждать исключения.</li>
     *     <li>С трогом режиме (strict mode), возвращение методом <code>{@link #defineProperty}</code> значение
     *     <code>false</code> возбудит исключение <code>{@link TypeError}</code>.</li>
     * </ul>
     *
     * @example
     * // The following code traps Object.defineProperty().
     * const p = new Proxy({}, {
     *     defineProperty: function(target, prop, descriptor) { console.log("called: " + prop); return true; } });
     * Object.defineProperty(p, "a", { configurable: true, enumerable: true, value: 10 }); // "called: a"
     *
     * @template V
     * @param {T} target целевой объект
     * @param {string} propertyName имя свойства, описание которого определяется
     * @param {PropertyDescriptor<V>|FieldDescriptor<V>} descriptor Описание свойства, которое устанавливается или
     * модифицируется.
     * @returns {boolean} удалось ли корректно установить описание свойства в <em>target</em>?
     *
     * @see Proxy
     * @see Object#defineProperty
     * @see Reflect#defineProperty
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[DefineOwnProperty]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-defineownproperty-p-desc}
     */
    defineProperty(target, propertyName, descriptor) {}

    /**
     * Метод <code>ProxyHandler.has()</code> является ловушкой для внутреннего метода
     * <code>[[HasProperty]]</code>. Т.е. данный метод-ловушка может перехватывать следующие вызовы и операции:
     * <ul>
     *     <li>Property query: <code>foo in proxy</code></li>
     *     <li>Inherited property query: <code>foo in {@link Object#create}(proxy)</code></li>
     *     <li><code>with</code> check: <code>with(proxy) { (foo); }</code></li>
     *     <li>{@link Reflect#has}()</li>
     * </ul>
     *
     * <h2>Инварианты</h2>
     * Если какой-либо из нижеперечисленных инвариантов не выполняется в отношении реализации данного метода, класс
     * <code>{@link Proxy}</code> после выполнения метода возбудит исключение <code>{@link TypeError}</code>:
     * <ul>
     *     <li>Свойство не может быть отображено как не существующее (non-existent), если оно существует как
     *     неконфигурируемое (non-configurable) собственное свойство целевого объекта.</li>
     *     <li>Свойство не может быть отображено как несуществующее, если оно существует как собственное свойство
     *     целевого объекта и целевой объект является нерасширяемым (not extensible).</li>
     * </ul>
     *
     * @example
     * // Следующий код перехватывает оператор:
     * const p = new Proxy({}, { has: function(target, prop) { console.log("called: " + prop); return true; }});
     * console.log("a" in p); // "called: a", true
     *
     * // Следующий код нарушает инвариант:
     * const p = new Proxy(Object.preventExtensions({ a: 10 }), { has: function(target, prop) { return false; }});
     * "a" in p; // Бросается TypeError
     *
     * @param {T} target целевой объект
     * @param {string} propertyName имя свойства, которое проверяется на существование
     * @returns {boolean}
     *
     * @see Proxy
     * @see in operator
     * @see Reflect#has
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[HasProperty]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-hasproperty-p}
     */
    has(target, propertyName) {}

    /**
     * Метод <code>ProxyHandler.get()</code> является перехватчиком для операции получения значения свойства. Т.е.
     * данный метод может перехватывать следующие вызовы и операции:
     * <ul>
     *     <li>Property access: <code>proxy[foo]</code> и <code>proxy.bar</code></li>
     *     <li>Inherited property access: <code>{@link Object#create}(proxy)[foo]</code></li>
     *     <li><code>with</code> check: <code>with(proxy) { (foo); }</code></li>
     *     <li>{@link Reflect#get}()</li>
     * </ul>
     *
     * <h2>Инварианты</h2>
     * Если какой-либо из нижеперечисленных инвариантов не выполняется в отношении реализации данного метода, класс
     * <code>{@link Proxy}</code> после выполнения метода возбудит исключение <code>{@link TypeError}</code>:
     * <ul>
     *     <li>The value reported for a property must be the same as the value of the corresponding target object
     *     property if the target object property is a non-writable, non-configurable data property.</li>
     *     <li>The value reported for a property must be undefined if the corresponding target object property is
     *     non-configurable accessor property that has undefined as its [[Get]] attribute.</li>
     * </ul>
     *
     * @example
     * // The following code traps getting a property value.
     * const p = new Proxy({}, { get: function(target, prop, receiver) { console.log("called: " + prop); return 10; }});
     * console.log(p.a); // "called: a", 10
     *
     * // The following code violates an invariant.
     * const obj = Object.defineProperty({}, "a", { configurable:false, enumerable:false, value:10, writable:false }),
     *     p = new Proxy(obj, { get: function(target, prop) { return 20; }});
     * p.a; // TypeError is thrown
     *
     * @param {T} target целевой объект
     * @param {string} propertyName имя свойства, значение которого пытаются получить
     * @param {*} receiver либо proxy, либо объект-наследник от proxy
     *
     * @see Proxy
     * @see Reflect#get
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[HasProperty]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver}
     */
    get(target, propertyName, receiver) {}

    set() {}

    deleteProperty() {}

    enumerate() {}

    ownKeys() {}

    apply() {}

    construct() {}
}