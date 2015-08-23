/**
 * Одно из нововведений стандарта ECMAScript 6 - протоколы перебора, которые могут реализованы любым объектом, соблюдая
 * при этом определенные правила.
 *
 * <h2>Протоколы перебора</h2>
 * Протоколы перебора включают протокол "iterable" и протокол "iterator".
 *
 * <h3>Протокол "iterable"</h3>
 * Позволяет JavaScript-объектам определять или настраивать поведение перебора, например, то, какие значения
 * перебираются в конструкции <code>for..of</code>. Некоторые встроенные типы, такие как <code>{@link Array}</code> или
 * <code>{@link Map}</code>, имеют поведение перебора по умолчанию, в то время как другие типы (такие как
 * <code>{@link Object}</code>) его не имеют.<br/>
 *
 * Для того, чтобы объект был итерируемым, в нем должен быть реализован метод <code>@@iterator</code>, т.е. этот объект
 * (или любой из объектов его цепочки прототипов - "prototype chain") должен иметь свойство с именем
 * <code>{@link Symbol#iterator}</code> и значением функции без аргументов, возвращающей объект, соответствующий
 * протоколу "iterator".<br/>
 *
 * Всякий раз, когда объект подлежит перебору (например, когда в коде встречается цикл <code>for..of</code>), вызывается
 * его метод <code>@@iterator</code> без аргументов, и возвращаемый <code>iterator</code> используется для получения
 * перебираемых значений.
 *
 * <h3>Протокол "iterator"</h3>
 * Определяет стандартный способ получения последовательности значений (конечной или бесконечной). Объект является
 * итератором, если в нем определен метод <code>{@link #next}()<code>.
 *
 * @example
 * // Some iterators are in turn iterables:
 * const someArray = [1, 5, 7],
 *     someArrayEntries = someArray.entries();
 * someArrayEntries.toString();           // "[object Array Iterator]"
 * someArrayEntries === someArrayEntries[Symbol.iterator](); // true
 *
 * // A String is an example of a built-in iterable object:
 * const someString = "hi";
 * typeof someString[Symbol.iterator] // "function"
 *
 * // String's default iterator returns the string's characters one by one:
 * const iterator = someString[Symbol.iterator]();
 * iterator + ""                                // "[object String Iterator]"
 * iterator.next()                              // { value: "h", done: false }
 * iterator.next()                              // { value: "i", done: false }
 * iterator.next()                              // { value: undefined, done: true }
 *
 * @interface
 * @template T
 */
class Iterator {

    /**
     * @returns {{done:boolean, value: T}} объект с двумя свойствами:
     * <ul>
     *     <li><code>done (boolean)</code> - Принимает значение <code>true>code> если итератор достиг конца итерируемой
     *     последовательности. В этом случае свойство <em>value</em> может определять возвращаемое значение итератора.
     *     Возвращаемые значения объясняются более подробно здесь:
     *     {@link http://www.2ality.com/2013/06/iterators-generators.html#generators-as-threads}.<br/>
     *     Принимает значение <code>false</code>, если итератор может генерировать следующее значение
     *     последовательности.</li>
     *     <li><code>value</code> - любое JavaScript значение, возвращаемое итератором. Может быть опущено, если
     *     <em>done</em> имеет значение <code>true</code>.</li>
     * </ul>
     */
    next() {}
}