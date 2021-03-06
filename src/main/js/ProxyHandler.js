'use strict';

/**
 * @template T
 * @interface
 */
class ProxyHandler {

    /**
     * Метод <code>ProxyHandler.getPrototypeOf()</code> ловит вызов внутреннего метода <code>[[GetPrototypeOf]]</code>,
     * т.е. перехватывает вызовы следующих методов и операций:
     * <code class="javascript"><ul>
     *     <li>{@link Object#getPrototypeOf}()</li>
     *     <li>{@link Reflect#getPrototypeOf}()</li>
     *     <li>{@link Object#isPrototypeOf}()</li>
     *     <li>instanceof</li>
     * </ul></code>
     *
     * <h2>Инварианты</h2>
     * Если какой-либо из нижеперечисленных инвариантов не выполняется в отношении реализации данного метода, класс
     * <code>{@link Proxy}</code> после его выполнения возбудит исключение <code>{@link TypeError}</code>:
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
     * Метод <code>ProxyHandler.setPrototypeOf()</code> ловит вызов dyenhtyytuj метода <code>[[SetPrototypeOf]]</code>,
     * т.е. перехватывает вызов <code>{@link Object#setPrototypeOf}()</code> и
     * <code>{@link Reflect#setPrototypeOf}()</code>.
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
     * Метод <code>ProxyHandler.isExtensible()</code> ловит вызов внутреннего метода <code>[[IsExtensible]]</code>, т.е.
     * перехватывает вызововы <code>{@link Object#isExtensible}()</code> и <code>{@link Reflect#isExtensible}()</code>.
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
     * Метод <code>ProxyHandler.preventExtensions()</code> ловит каждый вызов <code>[[PreventExtensions]]</code>, т.е.
     * перехватывает вызовы <code>{@link Object#preventExtensions}()</code> и
     * <code>{@link Reflect#preventExtensions}()</code>.
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
     * Метод <code>ProxyHandler.getOwnPropertyDescriptor</code> ловит вызов внутреннего метода
     * <code>[[GetOwnProperty]]</code>, т.е. перехватывает вызовов
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
     * Метод <code>ProxyHandler.defineProperty</code> ловит вызов внутреннего метода <code>[[DefineOwnProperty]]</code>,
     * т.е. им осуществляется перехват вызовов методов <code>{@link Object#defineProperty}()</code> и
     * <code>{@link Reflect#defineProperty}()</code>.
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
     * Метод <code>ProxyHandler.has()</code> ловит вызов внутреннего метода <code>[[HasProperty]]</code>, т.е.
     * перехватывает вызовы следующих методов и операций:
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
     * Метод <code>ProxyHandler.get()</code> ловит вызов внутренней операции <code>[[Get]]</code>, т.е.
     * вызовы следующих методов и операций:
     * <ul>
     *     <li>доступа к свойству: <code>proxy[foo]</code> и <code>proxy.bar</code></li>
     *     <li>доступа к унаследованному свойству: <code>{@link Object#create}(proxy)[foo]</code></li>
     *     <li>проверки <code>with</code>: <code>with(proxy) { (foo); }</code></li>
     *     <li>вызова <code>{@link Reflect#get}()</code></li>
     * </ul>
     *
     * <h2>Инварианты</h2>
     * Если какой-либо из нижеперечисленных инвариантов не выполняется в отношении реализации данного метода, класс
     * <code>{@link Proxy}</code> после выполнения метода возбудит исключение <code>{@link TypeError}</code>:
     * <ul>
     *     <li>Значение, возвращаемое для свойства, должно быть тем же, что и значение соответствующего поля целевого
     *     объекта, если свойство целевого объекта содержит данные, являясь незаписываемым (non-writable) и
     *     неконфигурируемым (non-configurable).</li>
     *     <li>Значение, возвращаемое для свойства, должно быть <code>undefined</code>, если значение соответствующего
     *     поля целевого объекта является неконфигурируемым (non-configurable) get/set-свойством, которое возвращает
     *     <code>undefined</code> в ответ на запрос <code>[[Get]]</code>.</li>
     * </ul>
     *
     * @example
     * // Следующий код ловит обращение к значению свойства:
     * const p = new Proxy({}, { get: function(target, prop, receiver) { console.log("called: " + prop); return 10; }});
     * console.log(p.a); // "called: a", 10
     *
     * // Следующий код нарушает инвариант:
     * const obj = Object.defineProperty({}, "a", { configurable:false, enumerable:false, value:10, writable:false }),
     *     p = new Proxy(obj, { get: function(target, prop) { return 20; }});
     * p.a; // Возбуждается TypeError
     *
     * @param {T} target целевой объект
     * @param {string} propertyName имя свойства, значение которого пытаются получить
     * @param {*} receiver Объект, каоторому данный вызов изначально адресован. Обычно это - данный proxy и есть, но
     * множество <code>ProxyHandler</code>`ов могут так же быть вызваны опосредованно, по цепи прототипов или
     * какими-либо иными способами. Например, предположим, что сценарий делает следующее: <code>obj.name</code>, и
     * <code>obj</code> - это не proxy, и он так же не имеет собственного свойства <code>.name</code>, но в его цепи
     * прототипов есть proxy. Метод <code>get ProxyHandler</code>`а этого proxy будет вызван, и <code>obj</code> будет
     * передан, как параметр <em>receiver</em>.
     *
     * @returns {?} значение свойства целевого объекта
     *
     * @see Proxy
     * @see Reflect#get
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[Get]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver}
     */
    get(target, propertyName, receiver) {}

    /**
     * Метод <code>ProxyHandler.set()</code> отлавливает вызов внутреннего метода <code>[[Set]]</code>), т.е.
     * перехватывает вызовы следующих методов и операций:
     * <ul>
     *     <li>Присвоение значения свойству: <code>proxy[foo] = bar and proxy.foo = bar</code></li>
     *     <li>Присвоение значения унаследованному свойству: <code>Object.create(proxy)[foo] = bar</code></li>
     *     <li><code>Reflect.set()</code></li>
     * </ul>
     *
     * <h2>Инварианты</h2>
     * Если какой-либо из нижеперечисленных инвариантов не выполняется в отношении реализации данного метода, класс
     * <code>{@link Proxy}</code> после выполнения метода возбудит исключение <code>{@link TypeError}</code>:
     * <ul>
     *     <li>Запрещается менять значение свойства так, что бы оно отличалось от значения соответствующего
     *     свойства целевого объекта в случае, если оно незаписываемое (non-writable) и неконфигурируемое
     *     (non-configurable).</li>
     *     <li>Запрещается менять значение свойства, если значение соответствующего свойства целевого объекта
     *     неконфигурируемое (non-configurable) get/set-свойство, возвращающее <code>undefined</code> в качестве своего
     *     <code>[[Set]]</code> атрибута.</li>
     *     <li>В строгом режиме (strict mode), возврат значения <code>false</code> из метода возбуждает исключение
     *     <code>{@link TypeError}</code>.</li>
     * </ul>
     *
     * @example
     * // Следующий код перехватывает установку значения свойства:
     * const p = new Proxy({}, {
     *     set: function(target, prop, value, receiver) { console.log("called: " + prop + " = " + value); return true; }
     * });
     * p.a = 10; // "called: a = 10"
     *
     * @param {T} target целевой объект
     * @param {string} property имя свойства для установки в него знаения
     * @param {*} value устанавливаемое в свойство новое значение
     * @param {*} receiver Объект, каоторому данный вызов изначально адресован. Обычно это - данный proxy и есть, но
     * множество <code>ProxyHandler</code>`ов могут так же быть вызваны опосредованно, по цепи прототипов или
     * какими-либо иными способами. Например, предположим, что сценарий делает следующее: <code>obj.name = "jen"</code>,
     * и <code>obj</code> - это не proxy, и он так же не имеет собственного свойства <code>.name</code>, но в его цепи
     * прототипов есть proxy. Метод <code>set ProxyHandler</code>`а этого proxy будет вызван, и <code>obj</code> будет
     * передан, как параметр <em>receiver</em>.
     *
     * @returns {boolean} <code>true</code> для того, что бы показать, что назначение нового значения произошло успешно.
     * Если метод <code>set</code> вернёт <code>false</code>, и присвоение производится в строгом режиме (strict-mode),
     * будет возбуждено исключение <code>{@link TypeError}</code>.
     *
     * @see Proxy
     * @see Reflect#set
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[Set]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-set-p-v-receiver}
     */
    set(target, property, value, receiver) {}

    /**
     * Метод <code>{@link ProxyHandler.deleteProperty}()</code> ловит вызов оператора <code>delete</code>, т.е.
     * перехватывает вызовы следующих методов и операций:
     * <ul>
     *     <li>Удаление свойства: <code>delete proxy[foo]</code> и <code>delete proxy.foo</code></li>
     *     <li><code>{@link Reflect#deleteProperty}()</code></li>
     * </ul>
     *
     * <h2>Инвариант</h2>
     * Свойство не может быть удалено, если оно существует как неконфигурируемое (non-configurable) собственное свойство
     * целевого объекта. Если метод сигнализирует об обратном, класс <code>{@link Proxy}</code> после его выполнения
     * возбудит исключение <code>{@link TypeError}</code>.
     *
     * @example
     * // Следующий код перехватывает оператор delete:
     * const p = new Proxy({}, {
     *     deleteProperty: function(target, prop) { console.log("called: " + prop); return true; }
     * });
     * delete p.a; // "called: a"
     *
     * @param {T} target цеевой объект
     * @param {string} propertyName имя свойства, которое необходимо удалить
     * @returns {boolean} удалось ли удалить свойство?
     *
     * @see Proxy
     * @see Reflect#deleteProperty
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[Delete]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-delete-p}
     */
    deleteProperty(target, propertyName) {}

    /**
     * Метод <code>{@link ProxyHandler.enumerate}()</code> ловит вызов оператора <code>for..in</code>, т.е.
     * перехватывает вызовы следующих методов и операций:
     * <ul>
     *     <li>Перечисление свойств объекта прокси / <code>for...in</code>:
     *     <code>for (var name in proxy) {...}</code></li>
     *     <li><code>{@link Reflect#enumerate}()</code></li>
     * </ul>
     *
     * <h2>Инвариант</h2>
     * Метод перечисления должен возвращать объект, иначе класс <code>{@link Proxy}</code> после его выполнения возбудит
     * исключение <code>{@link TypeError}</code>.
     *
     * @example
     * // Следующий код перехватывает оператор "for...in":
     * const p = new Proxy({}, {
     *     enumerate(target) { console.log("called"); return ["a", "b", "c"][Symbol.iterator](); }
     * });
     * for (let x in p) // "called"
     *     console.log(x);  // "a", "b", "c"
     *
     * // Следующий код нарушает инвариант.
     * const p = new Proxy({}, { enumerate(target) { return 1; } });
     * for (var x in p) {} // Возбуждается TypeError
     *
     * @param {T} target целевой объект
     * @return {Iterator<string|symbol>} перечисление имён свойств для возможности их перебора
     *
     * @see Proxy
     * @see Reflect#enumerate
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[Enumerate]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-enumerate}
     */
    enumerate(target) {}

    /**
     * Метод <code>ProxyHandler.ownKeys()</code> ловит вызов внутреннего метода <code>[[OwnPropertyKeys]]</code>,
     * т.е. перехватывает вызовы следующих методов:
     * <code><ul>
     *     <li>{@link Object#getOwnPropertyNames}()</li>
     *     <li>{@link Object#getOwnPropertySymbols}()</li>
     *     <li>{@link Object#keys}()</li>
     *     <li>{@link Reflect#ownKeys}()</li>
     * </ul></code>
     *
     * <h2>Инварианты</h2>
     * Если какой-либо из нижеперечисленных инвариантов не выполняется в отношении реализации данного метода, класс
     * <code>{@link Proxy}</code> после выполнения метода возбудит исключение <code>{@link TypeError}</code>:
     * <ul>
     *     <li>Возвращаемый результат метода <code>ownKeys</code> должен быть массивом.</li>
     *     <li>Тип каждого элемента массива должен быть либо <code>{@link String}</code>, либо
     *     <code>{@link Symbol}</code>.</li>
     *     <li>Результирующий список должен содержать ключи всех неконфигурируемых (non-configurable) собственных
     *     свойств целевого объекта.</li>
     *     <li>Если целевой объект нерасширяем (not extensible), результирующий список должен содержать все ключи
     *     собственных свойств целевого объекта и не содержать других значений.</li>
     * </ul>
     *
     * @example
     * // Следуюий код перехватывает вызов Object.getOwnPropertyNames()
     * const p = new Proxy({}, { ownKeys(target) { console.log("called"); return ["a", "b", "c"]; } });
     * console.log(Object.getOwnPropertyNames(p)); // "called"
     *
     * // Следующий вызов нарушает инвариант:
     * const obj = {};
     * Object.defineProperty(obj, "a", { configurable: false, enumerable: true, value: 10 });
     * const p = new Proxy(obj, { ownKeys(target) { return [123, 12.5, true, false, undefined, null, {}, []]; } });
     * console.log(Object.getOwnPropertyNames(p)); // Возбуждается TypeError: метод-перехватчик [[OwnPropertyKeys]]
     * // должен возвращать перечисление элементов, состоящих только из строк и символов
     *
     * @param {T} target целевой объект
     * @returns {Array<string|symbol>} перечислимый объект для перебора имён свойств (т.е. строк и символов)
     *
     * @see Proxy
     * @see Object#getOwnPropertyNames
     * @see Reflect#ownKeys
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[OwnPropertyKeys]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys}
     */
    ownKeys(target) {}

    /**
     * Метод <code>ProxyHandler.apply()</code> ловит вызов внутреннего метода <code>[[Call]]</code>, т.е. перехватывает
     * вызовы следующих методов и операторов:
     * <ul>
     *     <li><code>proxy(..args)</code></li>
     *     <li><code>{@link Function#apply}()</code> и <code>{@link Function#call}()</code></li>
     *     <li><code>{@link Reflect#apply}()</code></li>
     * </ul>
     *
     * @example
     * // Следующий код ловит вызов функции:
     * const p = new Proxy(()=>{}, {
     *     apply(target, thisArg, args) {
     *         console.log("called: " + args.join(", "));
     *         return args[0] + args[1] + args[2]; }});
     * console.log(p(1, 2, 3)); // "called: 1, 2, 3", 6
     *
     * @param {T} target целевой объект
     * @param {*} thisArg аргумент, доступный при вызове по ссылке <code>this</code>
     * @param {...?} args аргументы вызова метода
     * @returns {?} любое значение
     *
     * @see Proxy
     * @see Function#apply
     * @see Function#call
     * @see Reflect#apply
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[Call]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-call-thisargument-argumentslist}
     */
    apply(target, thisArg, ...args) {}

    /**
     * Метод <code>ProxyHandler.construct()</code> ловит вызов внутреннего метода <code>[[Construct]]</code>,
     * т.е. перехватывает вызовы следующих методов и операторов:
     * <code><ul>
     *     <li>new proxy(...args)</li>
     *     <li>{@link Reflect#construct}()</li>
     * </ul></code>
     *
     * <h2>Инварианты</h2>
     * Результат должен быть объектом, иначе класс <code>{@link Proxy}</code> после выполнения метода возбудит
     * исключение <code>{@link TypeError}</code>.
     *
     * @example
     * // Следуюий код перехватывает вызов оператора 'new':
     * const p = new Proxy(()=>{}, {
     *     construct(target, args) {
     *         console.log("called: " + argumentsList.join(", "));
     *         return { value: argumentsList[0] * 10 }; }});
     * console.log(new p(1).value); // "called: 1", 10
     *
     * // Следующий код нарушает инвариант:
     * const p = new Proxy(()=>{}, { construct(target, argumentsList) { return 1; } });
     * new p(); // Возбуждается TypeError
     *
     * @param {T} target целевой объект
     * @param {...?} args аргументы, передаваемые при вызове конструктору
     * @returns {*}
     *
     * @see Proxy
     * @see Reflect#construct
     * @since Standard ECMAScript 2015 (ECMA-262, 6th Edition) - описание '[[Construct]]':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-construct-internal-method}
     */
    construct(target, ...args) {}
}