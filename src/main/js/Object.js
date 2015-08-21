/**
 * @fileOverview Описание базового конструктора <code>Object</code>, вершины иерархии объектов JavaScript.
 * Текст комментариев в основном взят из книги
 * <a href="http://www.books.ru/books/javascript-podrobnoe-rukovodstvo-6-e-izdanie-fail-pdf-1826701/?show=1">"JavaScript
 * Подробное руководство" Дэвида Флэнагана, 6-е издание</a>, а так же (для ECMAScript 2015) перевод с сайта MDN.
 *
 * @author <a href="http://vlapin.ru/">Vyacheslav Lapin</a>
 * @version 0.1 (09.04.2014 14:09)
 */
'use strict';

/**
 * Класс, реализующий общие возможности всех JavaScript-объектов. <code>Object</code> – это встроенный тип данных
 * языка JavaScript. Он выступает в качестве надкласса для всех остальных JavaScript-объектов, следовательно,
 * методы и поведение класса <code>Object</code> наследуются всеми остальными объектами.<br/>
 * В дополнение к вызову конструктора класса <code>Object()</code>, объекты могут создаваться и инициализироваться при
 * помощи синтаксиса объектных литералов.
 *
 * @class
 *
 * @param {number|boolean|string|symbol?} value В этом необязательном аргументе указано элементарное
 * JavaScript-значение – число, логическое значение или строка, которое должно быть преобразовано в объект
 * <code>Number</code>, <code>Boolean</code> или <code>String</code>.
 *
 * @return {*} Если передан аргумент <em>value</em>, конструктор возвращает вновь созданный экземпляр
 * <code>Object</code>. Если указан аргумент <em>value</em> элементарного типа, конструктор создает объект-обертку
 * <code>Number</code>, <code>Boolean</code> или <code>String</code> для указанного элементарного значения.
 *
 * @see Array
 * @see Boolean
 * @see Function
 * @see Function#prototype
 * @see Number
 * @see String
 * @since Standard ECMA-262 1st. Edition - Первоначальное описание. Реализовано в JavaScript 1.0:
 * {@link http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%201st%20edition,%20June%201997.pdf}
 */
const Object = ((PROTOTYPE, EXTENSIBLE) => {

    function Object(value = undefined) {

        if (!(this instanceof Object)) // if Object was called without "new" keyword
            return new Object(value);

        switch (typeof value) {
            case 'number':
                return Number(value);
            case 'boolean':
                return Boolean(value);
            case 'string':
                return String(value);
            case 'symbol':
                return value;
        }

        Object.setPrototypeOf(this, this.constructor.prototype);
    }

    /**
     * Метод <code>Object.assign()</code> используется для копирования значений всех собственных перечислимых свойств из
     * одного или более исходных объектов в целевой объект. После копирования он возвращает целевой объект.<br/>
     * И <code>{@link String}</code>, и <code>{@link Symbol}</code>-properties копируются.<br/>
     * Метод <code>Object.assign()<code> копирует из исходных объектов в целевой объект только перечислимые и
     * собственные свойства. Он использует внутренний метод <code>[[Get]]</code> на исходных объектах и внутренний метод
     * <code>[[Put]]</code> на целевом объекте, так что он также вызывает геттеры и сеттеры. Именно поэтому он
     * присваивает свойства вместо простого копирования или определения новых свойств.<br/>
     * В случае возникновения ошибки, например, когда свойство является незаписываемым, возбуждается исключение
     * <code>{@link TypeError}</code>, а целевой объект <em>target</em> остаётся неизменным.<br/>
     * <strong>Обратите внимание</strong>, что метод <code>Object.assign()</code> не кидает исключений, если в качестве
     * исходных значений выступают <code>null</code> или <code>undefined</code>.
     *
     * @example
     * // Клонирование объекта:
     * let obj = { a: 1 },
     *     copy = Object.assign({}, obj);
     * console.log(copy.a === obj.a); // true
     *
     * // слияние объектов:
     * let o1 = { a: 1 },
     *     o2 = { b: 2 },
     *     o3 = { c: 3 },
     *     obj = Object.assign(o1, o2, o3);
     * console.log(obj); // { a: 1, b: 2, c: 3 }
     *
     * @template C
     * @param {C} target Целевой объект
     * @param {...*} sources Исходные объекты
     * @returns {C} Получившийся целевой объект
     * @throws TypeError если параметр <em>target</em> не определён (<code>undefined</code> или равен <code>null</code>)
     *
     * @since Standard ECMA-262 6th. Edition (ECMAScript 2015) - Описание 'Object.assign':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-object.assign}
     */
    Object.assign = (target, ...sources) => {
        if (typeof target === 'undefined' || target === null)
            throw new TypeError('Cannot convert first argument target object');

        target = Object(target);
        sources.forEach(source =>
            Object.keys(source).concat(Object.getOwnPropertySymbols(source)).forEach(propertyName => {
                const desc = Object.getOwnPropertyDescriptor(source, propertyName);
                if (desc !== undefined && desc.enumerable)
                    Object.defineProperty(target, propertyName, desc);
            }));
        return target;
    };

    /**
     * Создает объект с указанным прототипом и свойствами. Функция <code>Object.create()</code> создает и возвращает
     * новый объект с прототипом, определяемым аргументом <em>prototype</em>. Это означает, что новый объект наследует
     * свойства от <em>prototype</em>`а.<br/>
     * Если указан необязательный аргумент <em>descriptors</em>, функция <code>Object.create()</code> добавит в новый
     * объект свойства, как если бы был вызван метод <code>{@link Object.defineProperties}()</code>. То есть вызов
     * функции <code>Object.create(p,d)</code> с двумя аргументами эквивалентен вызовам:
     * <pre><code class="javascript">
     *     Object.defineProperties(Object.create(p), d);
     * </code></pre>
     * Дополнительную информацию об аргументе <i>descriptors</i> можно найти в справочной статье
     * <code>{@link Object.defineProperties}()</code>, а описание дескрипторов свойств в справочной статье
     * <code>{@link Object.getOwnPropertyDescriptor}()</code>.
     *
     * @example
     * // Создать объект, который имеет собственные свойства x и y и наследует свойство z
     * var p = Object.create({z:0}, {
     *      x: { value: 1, writable: false, enumerable:true, configurable: true},
     *      y: { value: 2, writable: false, enumerable:true, configurable: true}
     * });
     *
     * @template T
     * @param {*} prototype Прототип создаваемого объекта или <code>null</code>.
     * @param {*<FieldDescriptor<T>|PropertyDescriptor<T>>?} descriptors
     *  Необязательный объект, отображающий имена свойств в их дескрипторы.
     *
     * @returns {*} Вновь созданный объект, наследующий <code>prototype</code> и обладающий свойствами, описываемыми
     * дескрипторами.
     *
     * @throws {TypeError} Генерируется, если <code>prototype</code> не является объектом или значением
     * <code>null</code> или если указанные дескрипторы заставляют метод <code>{@link Object.defineProperties}()</code>
     * сгенерировать исключение <code>{@link TypeError}</code>.
     *
     * @see Object#defineProperty
     * @see Object#defineProperties
     * @see Object#getOwnPropertyDescriptor
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.create = (prototype, descriptors) => {
        if (this === Object || typeof this === 'undefined')
            switch (typeof prototype) {
                case 'object':
                case 'function':
                    const /** @type * */ result = new Object.create(Object.create.prototype = prototype);
                    return (typeof descriptors === 'undefined') ? result : Object.defineProperties(result, descriptors);
                default:
                    throw new TypeError('Object prototype may only be an Object or null: ' + prototype);
            }
        else
        /* Если происходит внутренний вызов функции как конструктора - удаляем ссылку на прототип, что бы не
         * захламлять этим основной код. */
            Object.create.prototype = null;
    };

    /**
     * Создает или настраивает свойства объекта. Функция <code>Object.defineProperties()</code> создает или настраивает
     * свойства объекта <em>object</em>, указанные и описанные в аргументе <em>descriptors</em>. Имена свойств объекта
     * <em>descriptors</em> являются именами свойств, которые будут созданы или настроены в объекте <em>object</em>, а
     * значениями этих свойств являются объекты дескрипторов свойств, которые определяют атрибуты создаваемых или
     * настраиваемых свойств.<br/>
     *
     * Функция <code>Object.defineProperties()</code> действует подобно функции <code>{@link #defineProperty}()</code>;
     * дополнительные подробности смотрите в описании этой функции. Дополнительные сведения об объектах дескрипторов
     * свойств приводятся в справочной статье <code>{@link #getOwnPropertyDescriptor}()</code>.
     *
     * @example
     * // Добавить в новый объект свойства x и y, доступные только для чтения
     * var p = Object.defineProperties({}, {
     *     x: { value: 0, writable: false, enumerable: true, configurable: true},
     *     y: { value: 1, writable: false, enumerable: true, configurable: true}
     * });
     *
     * @template T, V
     * @param {T} object Объект, в котором будут создаваться или настраиваться свойства.
     * @param {*<FieldDescriptor<V>|PropertyDescriptor<V>>?} descriptors Объект, отображающий имена свойств на их
     * дескрипторы.
     * @return {T} Объект <em>object</em>.
     *
     * @throws {TypeError} Генерируется, если аргумент <em>object</em> не является объектом или если какое-либо из
     * указанных свойств не может быть создано или настроено. Эта функция не является атомарной: она может создать или
     * настроить часть свойств и затем возбудить исключение, не создав или не настроив другие свойства.
     *
     * @see Object#create
     * @see Object#defineProperty
     * @see Object#getOwnPropertyDescriptor
     *
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.defineProperties = (object, descriptors) => {
        switch (typeof object) {
            case 'object':
            case 'function':
                Object.keys(descriptors).forEach(
                        descriptorName => Object.defineProperty(this, descriptorName, descriptors[descriptorName]),
                    object);
                return object;
        }
        throw new TypeError('Object.defineProperties called on non-object');
    };

    /**
     * Создаёт или настраивает одно свойство в объекте. Функция <code>Object.defineProperty()</code> создает или
     * настраивает свойство с именем <em>name</em> в объекте <em>object</em>, используя описание свойства в аргументе
     * <em>descriptor</em>. Дополнительные сведения об объектах дескрипторов свойств приводятся в справочной статье
     * <code>{@link #getOwnPropertyDescriptor}()</code>.<br/>
     * Если объект <em>object</em> еще не имеет свойства с именем <em>name</em>, эта функция просто создаст новое
     * свойство с атрибутами и значением, указанными в <em>дескрипторе</em>. Если в дескрипторе не указаны какие-либо
     * атрибуты, соответствующие им атрибуты получат значение <code>false</code> или <code>undefined</code>.<br/>
     * Если значение аргумента <em>name</em> совпадает с именем существующего свойства объекта <em>object</em>, то
     * функция <code>Object.defineProperty()</code> настроит это свойство, изменив его значение или атрибуты. В этом
     * случае в <em>descriptor</em>`е достаточно указать только атрибуты, которые должны быть изменены: атрибуты,
     * отсутствующие в дескрипторе, сохранят свои прежние значения.
     *
     * @example
     * function constant(o, n, v) { // Определить константу o.n со значением v
     *     Object.defineProperty(o, n, { value: v, writable: false, enumerable: true, configurable: false});
     * }
     *
     * @template T, V
     * @param {T} object Объект, в котором будет создаваться или настраиваться свойство.
     * @param {string} name Имя создаваемого или настраиваемого свойства.
     * @param {FieldDescriptor<V>|PropertyDescriptor<V>} descriptor Объект дескриптора свойства, описывающий новое
     * свойство или изменения, которые должны быть выполнены в существующем свойстве.
     *
     * @returns {T} <em>object</em>
     *
     * @throws {TypeError} Генерируется, если аргумент <em>object</em> не является объектом или если свойство не может
     * быть создано (из-за того, что объект <em>object</em> является нерасширяемым) или настроено (например, из-за того,
     * что уже существующее свойство является ненастраиваемым).
     *
     * @see Object#create
     * @see Object#defineProperties
     * @see Object#getOwnPropertyDescriptor
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.defineProperty = (object, name, descriptor) => {
        /* native code */
        return object;
    };

    /**
     * Делает объект неизменяемым. Функция <code>Object.freeze()</code> делает объект <em>object</em> нерасширяемым
     * (<code>{@link #preventExtensions}()</code>), а все его собственные свойства – ненастраиваемыми, подобно функции
     * <code>{@link #seal}()</code>. Однако в дополнение к этому она делает все неунаследованные свойства доступными
     * только для чтения. Это означает, что в объект <em>object</em> нельзя будет добавлять новые свойства, а
     * существующие свойства-данные нельзя будет изменить или удалить. Действие функции <code>freeze()</code> является
     * необратимым, т.е. зафиксированный объект нельзя снова сделать доступным для изменения.<br/>
     *
     * Имейте в виду, что функция <code>Object.freeze()</code> устанавливает атрибут <code>writable</code>, имеющийся
     * только в свойствах-данных. Она не действует на свойства, имеющие методы записи. Отметьте также, что функция
     * <code>Object.freeze()</code> не действует на унаследованные свойства.
     *
     * @static
     *
     * @template T
     * @param {T} object Объект, который должен быть зафиксирован.
     * @returns {T} Зафиксированный объект <em>object</em>
     *
     * @see Object#defineProperty
     * @see Object#isFrozen
     * @see Object#preventExtensions
     * @see Object#seal
     *
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.freeze = object => {
        Object.keys(Object.seal(object)).forEach(key => Object.defineProperty(object, key, {writable: false}));
        return object;
    };

    /**
     * Возвращает атрибуты свойства. Функция <code>Object.getOwnPropertyDescriptor()</code> возвращает дескриптор для
     * указанного свойства заданного объекта. Дескриптор свойства – это объект, описывающий атрибуты и значение
     * свойства.
     *
     * @template V
     * @param {*} object Объект, которому принадлежит искомое свойство.
     * @param {string} propertyName Имя свойства (или индекс элемента массива), атрибуты которого требуется получить.
     * @returns {FieldDescriptor<V>|PropertyDescriptor<V>}
     * Объект дескриптора для указанного свойства заданного объекта или <code>undefined</code>, если такое свойство не
     * существует.
     *
     * @see Object#defineProperty
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.getOwnPropertyDescriptor = (object, propertyName) => {
        /* proxied code*/
        return /** @type FieldDescriptor<V> */ {
            configurable: true,
            writable: true,
            value: object[propertyName],
            enumerable: true
        };
    };

    /**
     * Возвращает имена неунаследованных свойств. Функция <code>Object.getOwnPropertyNames()</code> возвращает массив с
     * именами всех неунаследованных объектом <em>object</em> свойств, включая неперечислимые свойства. Для получения
     * массива имен только перечислимых свойств можно использовать функцию <code>{@link #keys}()</code>.
     *
     * @example
     * Object.getOwnPropertyNames([]) // => ["length"]: "length" - неперечислимое
     *
     * @param {*} object Объект.
     * @returns {Array<string>} Массив, содержащий имена всех неунаследованных свойств объекта <em>object</em>, включая
     * неперечислимые свойства.
     *
     * @see Object#keys
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.getOwnPropertyNames = object => Object.keys(object).concat(/*proxied code*/);

    /**
     * Метод <code>Object.getOwnPropertySymbols()</code> возвращает массив всех символических (symbol) свойств,
     * найденных в данном объекте. Как и <code>{@link Object#getOwnPropertyNames}()</code>, вы получаете все
     * символические свойства как массив символов. Обратите внимание, что метод
     * <code>{@link Object#getOwnPropertyNames}()</code> сам по себе не выдаёт символьные свойства объекта, а выдаёт
     * лишь строковые свойства.<br/>
     * As all objects have no own symbol properties initially, Object.getOwnPropertySymbols() returns an empty array
     * unless you have set symbol properties on your object.
     *
     * @param {Object} object
     * @returns {Array<symbol>} Массив символов данного объекта
     *
     * @since Standard ECMA-262 6th. Edition (ECMAScript 2015)
     */
    Object.getOwnPropertySymbols = object => {
        /* proxied code */
        return [];
    };

    /**
     * Возвращает прототип объекта. Функция <code>Object.getPrototypeOf()</code> возвращает прототип своего аргумента.
     * Обратите внимание, что эта функция вызывается не как метод объекта: это глобальная функция, которая принимает
     * объект в виде аргумента.
     *
     * @example
     * var p = {}; // Обычный объект
     * Object.getPrototypeOf(p) // => Object.prototype
     * var o = Object.create(p) // Объект, наследующий объект p
     * Object.getPrototypeOf(o) // => p
     *
     * @param {*} object
     * @returns {*}
     *
     * @see #create
     * @see Function#prototype
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.getPrototypeOf = object => this[PROTOTYPE];

    /**
     * Метод <code>Object.is()</code> определяет, являются ли два значения <a
     * href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness">одинаковыми
     * значениями</a>. Два значения являются одинаковыми в следующих случаях:
     * <ul>
     *     <li>оба равны <code>undefined</code></li>
     *     <li>оба равны <code>null</code></li>
     *     <li>оба равны <code>true</code>, либо оба равны <code>false</code></li>
     *     <li>оба являются строками с одинаковой длиной и одинаковыми символами</li>
     *     <li>оба являются одним и тем же объектом</li>
     *     <li>оба являются числами и
     *      <ul>
     *          <li>оба равны +0</li>
     *          <li>оба равны -0</li>
     *          <li>оба равны NaN</li>
     *          <li>либо оба не равны нулю или NaN и оба имеют одинаковое значение</li>
     *      </ul>
     *     </li>
     * </ul>
     * Поведение этого метода не аналогично оператору <code>==</code>. Оператор <code>==</code> использует приведение
     * типов обоих операндов (если они имеют различный тип) перед проверкой на равенство (в результате получается, что
     * проверка <code>"" == false</code> даёт <code>true</code>), а метод <code>Object.is</code> приведение типов не
     * выполняет.<br/>
     * Поведение этого метода не аналогично оператору <code>===</code>. Оператор <code>===</code> (также как и оператор
     * <code>==</code>) считает числовые значения <code>-0</code> и <code>+0</code> равными, а значение
     * <code>{@link Number#NaN}</code> не равным самому себе.
     *
     * @example
     * Object.is('foo', 'foo');     // true
     * Object.is(window, window);   // true
     * Object.is('foo', 'bar');     // false
     * Object.is([], []);           // false
     * var test = { a: 1 };
     * Object.is(test, test);       // true
     * Object.is(null, null);       // true
     * // Специальные случаи
     * Object.is(0, -0);            // false
     * Object.is(-0, -0);           // true
     * Object.is(NaN, 0/0);         // true
     *
     * @param value1 Первое сравниваемое значение.
     * @param value2 Второе сравниваемое значение.
     * @returns {boolean}
     *
     * @since Standard ECMA-262 6th. Edition (ECMAScript 2015) - Описание 'Object.is':
     * {@link http://www.ecma-international.org/ecma-262/6.0/#sec-object.is}
     */
    Object.is = (value1, value2) => (value1 === 0 && value2 === 0) ? 1 / value1 === 1 / value2 :
            (value1 !== value1) ? value2 !== value2 : value1 === value2;

    /**
     * Возможно ли добавить в объект новое свойство? Если в объект можно добавлять новые свойства, он является
     * расширяемым. Все объекты сразу после создания являются расширяемыми и остаются таковыми, пока не будут переданы
     * какой-либо из следующих функций: <code>{@link Object#preventExtensions}()</code>,
     * <code>{@link Object#seal}()</code> или <code>{@link Object#freeze}()</code>.
     *
     * @example
     * var o = {}; // Создать новый объект
     * Object.isExtensible(o) // => true: он является расширяемым
     * Object.preventExtensions(o); // Сделать нерасширяемым
     * Object.isExtensible(o) // => false: теперь он нерасширяемый
     *
     * @param {*} object Объект, проверяемый на возможность расширения.
     * @returns {boolean} <code>true</code>, если в объект можно расширить новыми свойствами, и <code>false</code> –
     * если нет.
     *
     * @see Object#isFrozen
     * @see Object#isSealed
     * @see Object#preventExtensions
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.isExtensible = object => object[EXTENSIBLE];

    /**
     * Является ли объект неизменяемым? Объект считается зафиксированным, если все его неунаследованные свойства (кроме
     * свойств с методами записи) доступны только для чтения и он является нерасширяемым. Объект считается
     * нерасширяемым, если в него нельзя добавить новые (неунаследованные) свойства и из него нельзя удалить имеющиеся
     * (неунаследованные) свойства. Функция <code>isFrozen()</code> проверяет, является ли ее аргумент зафиксированным
     * объектом или нет. Зафиксированный объект нельзя расфиксировать.<br/>
     *
     * Обычно фиксация объектов выполняется с помощью функции <code>{@link Object#freeze}()</code>. Однако зафиксировать
     * объект можно также с помощью функции <code>{@link Object#preventExtensions}()</code> с последующим вызовом
     * <code>{@link Object#defineProperty}()</code>, чтобы сделать все свойства объекта неудаляемыми и доступными только
     * для чтения.
     *
     * @param {*} object Проверяемый объект.
     * @returns {boolean} <code>true</code>, если объект o является зафиксированным и неизменяемым, и <code>false</code>
     * – если нет.
     *
     * @see Object#defineProperty
     * @see Object#freeze
     * @see Object#isExtensible
     * @see Object#isSealed
     * @see Object#preventExtensions
     * @see Object#seal
     *
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.isFrozen = object => Object.isExtensible(object) && Object.getOwnPropertyNames(object).every(
                propertyName => Object.getOwnPropertyDescriptor(object, propertyName).writable);

    /**
     * Возможно ли добавлять в объект новые и удалять существующие свойства? Объект считается нерасширяемым, с
     * недоступными для настройки свойствами, если в него нельзя добавить новые (неунаследованные) свойства и нельзя
     * удалить существующие (неунаследованные) свойства. Функция <code>Object.isSealed()</code> проверяет, является ли
     * ее аргумент нерасширяемым объектом, с недоступными для настройки свойствами, или нет. Недоступные для настройки
     * свойства нельзя вновь сделать настраиваемыми. Обычно такие объекты получают с помощью функции
     * <code>{@link Object#seal}()</code> или <code>{@link Object#freeze}()</code>. Однако того же эффекта можно
     * добиться с помощью функции <code>{@link Object#preventExtensions}()</code>, с последующим вызовом
     * <code>{@link Object#defineProperty}()</code>, чтобы сделать все свойства объекта неудаляемыми.
     *
     * @param {*} object Проверяемый объект.
     * @returns {boolean} <code>true</code>, если объект o является нерасширяемым, с недоступными для настройки
     * свойствами, и <code>false</code> – если нет.
     *
     * @see Object#defineProperty
     * @see Object#freeze
     * @see Object#isExtensible
     * @see Object#isFrozen
     * @see Object#preventExtensions
     * @see Object#seal
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.isSealed = object => Object.isExtensible(object) && object.getOwnPropertyNames().some(
                    propertyName => Object.getOwnPropertyDescriptor(object, propertyName).configurable);

    /**
     * Возвращает имена собственных перечислимых свойств. Функция <code>{@link Object#keys}()</code> возвращает массив с
     * именами свойств объекта <em>object</em>. Массив включает только имена свойств, которые являются перечислимыми и
     * определены непосредственно в объекте <em>object</em>: унаследованные свойства не включаются. (Для получения имен
     * неперечислимых свойств можно использовать функцию <code>{@link Object#getOwnPropertyNames}()</code>.) Свойства в
     * массиве следуют в том же порядке, в каком они перечисляются циклом <code>for/in</code>.
     *
     * @example
     * Object.keys({x:1, y:2}) // => ["x", "y"]
     *
     * @param {*} object Объект.
     * @returns {Array<string>} Массив, содержащий имена всех перечислимых (неунаследованных) свойств объекта
     * <em>object</em>.
     *
     * @see Object#getOwnPropertyNames
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.keys = object => {
        var /** @type Array<string> */ result = [];
        for (let /** @type string */ propertyName in object)
            if (object.hasOwnProperty(propertyName))
                result.push(propertyName);
        return result;
    };

    /**
     * Метод <code>Object.observe()</code> используется для асинхронного обзора изменений в объекте. Он предоставляет
     * поток изменений в порядке их возникновения. Функция <em>callback</em> вызывается каждый раз при возникновении
     * изменений в объекте <em>object</em> с массивом всех изменений в порядке их возникновения.
     *
     * @template T
     * @param {T} object Обозреваемый объект.
     * @param {function({name:string, object:T, type:string, oldValue:number|string|boolean|*})} callback Функция,
     * вызываемая при возникновении изменений в объекте, принимает аргумент <code>changes</code> - Массив объектов,
     * представляющих одно изменение. Объекты с изменениями содержат следующие свойства:
     * <ul>
     *     <li><em>name</em> имя изменённого свойства.</li>
     *     <li><em>object</em>: изменённый объект после изменения.</li>
     *     <li><em>type</em>: строка, указывающая тип произошедшего изменения. Может принимать одно из значений:
     *      "add", "update" или "delete".</li>
     *     <li><em>oldValue</em>: только для типов "update" и "delete". Значение до изменения.</li>
     * </ul>
     *
     * @example
     * // Журналирование всех трёх типов изменений
     * const obj = {foo: 0, bar: 1};
     * Object.observe(obj, function(changes) {console.log(changes);});
     * obj.baz = 2; // [{name: 'baz', object: <obj>, type: 'add'}]
     * obj.foo = 'hello'; // [{name: 'foo', object: <obj>, type: 'update', oldValue: 0}]
     * delete obj.baz; // [{name: 'baz', object: <obj>, type: 'delete', oldValue: 2}]
     *
     * // Привязка данных - Пользовательская модель
     * const user = { id: 0, name: 'Брендан Айк', title: 'М-р.'};
     *
     * // Создаёт приветствие для пользователя
     * function updateGreeting() {
     *  user.greeting = 'Здравствуйте, ' + user.title + ' ' + user.name + '!';
     * }
     * updateGreeting();
     *
     * Object.observe(user, changes => changes.forEach(change => {
     *      // Любое изменение имени или обращения обновит привествие
     *      if (change.name === 'name' || change.name === 'title')
     *          updateGreeting();
     * }));
     *
     * @see Object#unobserve
     * @see Array#observe
     * @since Standard ECMA-262 7th. Edition
     */
    Object.observe = (object, callback) => {
        /* proxied code */
    };

    /**
     * Предотвращает добавление в объект новых свойств. Функция <code>{@link Object#preventExtensions}()</code>
     * присваивает значение <code>false</code> атрибуту <code>extensible</code> объекта <em>object</em>, вследствие чего
     * в него нельзя будет добавлять новые свойства. Действие этой функции необратимо: нерасширяемый объект нельзя вновь
     * сделать расширяемым. Следует отметить, что <code>{@link Object#preventExtensions}()</code> не воздействует на
     * цепочку прототипов, и нерасширяемый объект все еще можно расширить новыми наследуемыми свойствами.
     *
     * @template T
     * @param {T} object Объект, который должен иметь расширяемый набор атрибутов.
     * @returns {T} Объект <em>object</em> с аргументами.
     *
     * @see Object#freeze
     * @see Object#isExtensible
     * @see Object#seal
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.preventExtensions = object => {
        /* proxied code */
        return object;
    };

    /**
     * Проверяет, будет ли свойство видимо для цикла <code>for/in</code>. Инструкция <code>for/in</code> выполняет цикл
     * по «перечисляемым» свойствам объекта. Однако не все свойства объекта являются перечисляемыми: свойства,
     * добавленные в объект JavaScript-кодом, перечисляемы, а предопределенные свойства (например, методы) встроенных
     * объектов обычно не перечисляемы. Метод <code>propertyIsEnumerable()</code> служит для установления различия между
     * перечисляемыми и не перечисляемыми свойствами. Однако следует заметить: спецификация ECMAScript утверждает, что
     * <code>propertyIsEnumerable()</code> не проверяет цепочку прототипов, т.е. этот метод годится только для локальных
     * свойств объекта и не предоставляет способа для проверки перечисляемости унаследованных свойств.
     *
     * @example
     * var o = new Object(); // Создает объект
     * o.x = 3.14; // Определяет свойство
     * o.propertyIsEnumerable("x"); // true: свойство x локальное и перечисляемое
     * o.propertyIsEnumerable("y"); // false: o не имеет свойства y
     * o.propertyIsEnumerable("toString"); // false: свойство toString является унаследованным
     * Object.prototype.propertyIsEnumerable("toString"); // false: неперечисляемое свойство
     *
     * @param {*} propertyName Строка, содержащая имя свойства объекта.
     * @returns {boolean} Возвращает <code>true</code>, если у объекта есть не унаследованное свойство с именем,
     * указанным в аргументе <code>propertyName</code>, и если это свойство «перечисляемое», т.е. оно может быть
     * перечислено циклом <code>for/in</code> для объекта.
     *
     * @see Function#prototype
     * @see Object#hasOwnProperty
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.propertyIsEnumerable = propertyName => Object.getOwnPropertyDescriptor(this, propertyName).enumerable;

    /**
     * Предотвращает добавление и удаление свойств. Функция <code>Object.seal()</code> делает объект <em>object</em>
     * нерасширяемым (<code>{@link Object#preventExtensions}()</code>), а все его собственные свойства –
     * ненастраиваемыми. Это предотвращает добваление новых свойств и удаление существующих. Действие этой функции
     * необратимо: нерасширяемый объект с ненастраиваемыми свойствами нельзя вновь сделать расширяемым объектом.<br/>
     *
     * Имейте  в виду, что Object.seal() не делает свойства объекта доступными только для чтения; используйте для этого
     * функцию <code>{@link Object#freeze}()</code>. Отметьте также, что <code>{@link Object#seal}()</code> не
     * воздействует на унаследованные свойства. Если в цепочке прототипов объекта, обработанного функцией
     * <code>{@link Object#seal}()</code>, имеется расширяемый и настраиваемый объект, тогда имеется возможность
     * добавлять и удалять наследуемые им свойства.
     *
     * @template T
     * @param {T} object Объект, который должен стать нерасширяемым, с недоступными для настройки свойствами.
     * @returns {T} Объект в аргументе.
     *
     * @see Object#defineProperty
     * @see Object#freeze
     * @see Object#isSealed
     * @see Object#preventExtensions
     * @since Standard ECMA-262 5th. Edition (ECMAScript 5)
     */
    Object.seal = object => {
        /* proxied code */
        return object;
    };

    /**
     * Метод <code>Object.setPrototype()</code> устанавливает прототип (то есть, внутреннее свойство
     * <code>[[Prototype]]</code>) указанного объекта в другой объект или <code>null</code>.<br/>
     * Выкидывает исключение <code>{@link TypeError}</code>, если объект, чей прототип <code>[[Prototype]]</code>
     * является не расширяемым, согласно методу <code>{@link Object#isExtensible}()</code>. Не делает ничего, если
     * параметр <em>prototype</em> не является объектом или значением <code>null</code> (то есть, является числом,
     * строкой, логическим значением или <code>undefined</code>). В противном случае метод устанавливает прототип
     * <code>[[Prototype]]</code> объекта obj в новое значение.<br/>
     * <strong>Предупреждение</strong>: Изменение прототипа <code>[[Prototype]]</code> объекта является, по самой
     * природе оптимизации доступа к свойствам в современных движках JavaScript, очень медленной операцией, это
     * справедливо для <strong>любого</strong> браузера и движка JavaScript. Изменение прототипов очень тонко и обширно
     * влияет на производительность, причём это влияние не ограничивается просто временем, проведённым внутри метода
     * <code>Object.setPrototypeOf()</code>, оно может распространяться на любой код, который имеет доступ к любому
     * объекту, чей прототип <code>[[Prototype]]</code> был изменён. Если вы заботитесь о производительности, вы никогда
     * не должны изменять прототип <code>[[Prototype]]</code> объекта. Вместо этого создайте объект с нужным прототипом
     * <code>[[Prototype]]</code>, с помощью метода <code>{@link Object#create}()</code>.
     *
     * @example
     * var dict = Object.setPrototypeOf({}, null);
     *
     * @param {*} object Объект, которому устанавливается прототип.
     * @param {*} prototype Новый прототип объекта (объект или <code>null</code>).
     *
     * @see Object#isPrototypeOf
     * @see Object#getPrototypeOf
     * @see Object#__proto__
     * @since Standard ECMA-262 6th. Edition
     */
    Object.setPrototypeOf = (object, prototype) => {
        object[PROTOTYPE] = prototype;
    };

    /**
     * The <code>Object.unobserve()</code> method is used to remove observers set by
     * <code>{@link Object#observe}()</code>. <code>Object.unobserve()</code> should be called after
     * <code>Object.observe()</code> in order to remove an observer from an object.<br/>
     *
     * The <em>callback</em> should be a reference to a function and not an anonymous function, because this reference
     * will be used to unset the previous observer. It's useless to call <code>Object.unobserve()</code> with an
     * anonymous function as callback, it will not remove any observer.
     *
     * @example
     * // Unobserving an object
     * var obj = { foo: 0, bar: 1 },
     *     observer = function(changes) { console.log(changes); };
     * Object.observe(obj, observer);
     * obj.newProperty = 2; // [{name: 'newProperty', object: <obj>, type: 'add'}]
     * Object.unobserve(obj, observer);
     * obj.foo = 1; // The callback wasn't called
     *
     * // Using an anonymous function
     * var person = { name : 'Ahmed', age : 25 };
     * Object.observe(person, function (changes) { console.log(changes); });
     * person.age = 40; // [{name: 'age', object: <obj>, oldValue: 25, type: 'update'}]
     * Object.unobserve(person, function (changes) { console.log(changes); });
     * person.age = 63; // [{name: 'age', object: <obj>, oldValue: 40, type: 'update'}]
     * // The callback will always be called
     *
     * @template T
     * @param {T} object Обозреваемый объект.
     * @param {function({name:string, object:T, type:string, oldValue:number|string|boolean|*})} callback The reference
     * to the observer to stop calling each time changes are made on the object obj.
     *
     * @see Object#observe
     * @see Array#observe
     * @see Array#unobserve
     * @since Standard ECMA-262 7th. Edition
     */
    Object.unobserve = (object, callback) => {
        /* proxied code*/
    };


    /**
     * Проверяет, является ли свойство унаследованным. JavaScript-объекты могут иметь собственные свойства, а так же
     * наследовать свойства от своих объектов-прототипов. Метод <code>hasOwnProperty()</code> предоставляет способ,
     * позволяющий установить различия между унаследованными свойствами и не унаследованными локальными свойствами.
     *
     * @example
     * var o = new Object(); // Создаем объект
     * o.x = 3.14; // Определяем неунаследованное локальное свойство
     * o.hasOwnProperty("x"); // Возвращает true: x – это локальное свойство o
     * o.hasOwnProperty("y"); // Возвращает false: o не имеет свойства y
     * o.hasOwnProperty("toString"); // Возвращает false: свойство toString унаследовано
     *
     * @param {string} propertyName Строка, содержащая имя свойства объекта.
     * @returns {boolean} Возвращает <code>true</code>, если объект имеет неунаследованное свойство с именем, заданным в
     *  <code>propertyName</code>. Возвращает <code>false</code>, если объект не имеет свойства с указанным именем или
     *  если он наследует это свойство от своего объекта-прототипа.
     *
     * @see Function#prototype
     * @see Object#propertyIsEnumerable;
     * @since Standard ECMA-262 3rd. Edition (ECMAScript 3)
     */
    Object.prototype.hasOwnProperty = propertyName => {

        if (!(propertyName in this)) // Если свойства нет в цепочке прототипов
            return false;

        let /** @type * */ proto = Object.getPrototypeOf(this);
        if (propertyName in proto) { // Если свойство считывается у кого-то из его прототипов...

            if (this[propertyName] !== proto[propertyName]) // ...и они не равны
                return true;

            /* Попытаемся удалить свойство у того звена цепочки прототипов, которому это свойство принадлежит, запомнив
             * его дескриптор и сохранив ссылку на сам этот прототип */

            /**
             * @template V
             * @type {{enumerable:boolean?, configurable:boolean?, value:V?, writable:boolean? get:function():V?, set:function(V)?}}
             */
            const propertyDescriptor = Object.getOwnPropertyDescriptor(proto, propertyName);
            while (!proto.hasOwnProperty(propertyName)) // Находим звено в цепочке прототипов, владеющее свойством
                proto = Object.getPrototypeOf(proto);

            if (!propertyDescriptor.writable && propertyDescriptor.configurable) // Preparing for delete
                Object.defineProperty(proto, propertyName, {writable: true});

            try {
                if (delete proto[propertyName]) // Если удалось его удалить...
                    return this.hasOwnProperty(propertyName);
            } finally {
                Object.defineProperty(proto, propertyName, propertyDescriptor);
            }
        }

        return true;
    };

    /**
     * Проверяет, является ли один объект прототипом другого объекта. JavaScript-объекты наследуют свойства от своих
     * объектов-прототипов. К прототипу объекта можно обращаться с помощью свойства <code>prototype</code>
     * функции-конструктора, которая использовалась для создания и инициализации объекта. Метод
     * <code>{@link Object#isPrototypeOf}()</code> предоставляет возможность определить, является ли один объект
     * прототипом другого. Этот прием может применяться для определения конструктора объекта.
     *
     * @example
     * var o = new Object(); // Создание объекта
     * Object.prototype.isPrototypeOf(o) // true: o – это объект
     * Function.prototype.isPrototypeOf(o.toString); // true: toString – это функция
     * Array.prototype.isPrototypeOf([1,2,3]); // true: [1,2,3] – это массив
     * // Ту же проверку можно выполнить другим способом
     * (o.constructor == Object); // true: o был создан с помощью конструктора Object()
     * (o.toString.constructor == Function); // true: o.toString – это функция
     * // Объекты-прототипы сами имеют прототипы. Следующий вызов возвращает true, показывая, что объекты-функции
     * // наследуют свойства от Function.prototype, а также от Object.prototype.
     * Object.prototype.isPrototypeOf(Function.prototype);
     *
     * @param {*} object Любой объект.
     * @returns {boolean} Возвращает <code>true</code>, если данный объект представляет собой прототип объекта
     * <code>object</code>. Возвращает <code>false</code>, если <code>object</code> не является объектом или если данный
     * объект не является прототипом объекта <code>object</code>.
     *
     * @see Function#prototype
     * @see Object#constructor
     * @since Standard ECMA-262 3rd. Edition (ECMAScript 3)
     */
    Object.prototype.isPrototypeOf = object => this === Object.getPrototypeOf(object);

    /**
     * Возвращает локализованное строковое представление объекта. Этот метод предназначен для получения строкового
     * представления объекта, локализованного в соответствии с текущими региональными настройками. Метод
     * <code>toLocaleString()</code>, предоставляемый по умолчанию конструктором <code>{@link Object}</code>, просто
     * вызывает метод <code>{@link #toString}()</code> и возвращает полученную от него нелокализованную строку. Однако
     * обратите внимание, что другие конструкторы, в том числе <code>{@link Array}</code>, <code>{@link Date}</code> и
     * <code>{@link Number}</code>, определяют собственные версии этого метода для локализованного преобразования в
     * строку. Вы так же можете переопределить этот метод собственными конструкторами.
     *
     * @returns {string} Строковое представление объекта
     *
     * @see Array#toLocaleString
     * @see Date#toLocaleString
     * @see Number#toLocaleString
     * @see Object#toString
     * @since Standard ECMA-262 3rd. Edition (ECMAScript 3)
     */
    Object.prototype.toLocaleString = () => this.toString();

    /**
     * Возвращает строковое представление объекта. Метод <code>toString()</code> относится к тем, которые обычно не
     * вызываются явно в JavaScript-программах. Программист  определяет  этот метод в своих объектах,  а система
     * вызывает метод, когда требуется  преобразовать объект в строку.<br/>
     * JavaScript вызывает  метод <code>toString()</code> для преобразования <em>объекта</em> в строку всякий раз, когда
     * <em>объект</em> используется в строковом контексте. Например, если объект преобразуется в строку при передаче в
     * функцию, требующую строкового аргумента:
     * <pre><code>
     *     alert(myObject);
     * </code></pre>
     *
     * Подобным же образом объекты преобразуются в строки, когда они конкатенируются со строками с помощью оператора +:
     * <pre><code>
     *     var msg = 'Мой объект:' + myObject;
     * </code></pre>
     *
     * Метод <code>toString()</code> вызывается без аргументов и должен возвращать строку. Чтобы от возвращаемой строки
     * была какая-то польза, эта строка должна каким-либо образом базироваться на значении объекта, для которого был
     * вызван метод.<br/>
     * Определяя в JavaScript специальный класс, целесообразно определить для него метод <code>toString()</code>. Если
     * этого не сделать, объект наследует метод <code>toString()</code>, определенный по умолчанию в классе
     * <code>Object</code>. Этот стандартный метод возвращает строку в формате:
     * <pre><code>
     *     [object класс]
     * </code></pre>
     * где <em>класс</em> – это класс объекта: значение, такое как «Object», «String», «Number», «Function», «Window»,
     * «Document» и т. д. Такое поведение стандартного метода <code>toString()</code> иногда бывает полезно для
     * определения типа или класса неизвестного объекта. Однако большинство объектов имеют собственную версию
     * <code>toString()</code>, поэтому для произвольного объекта <code>o</code> необходимо явно вызывать метод
     * <code>Object.toString()</code>, как показано ниже:
     * <pre><code>
     *     Object.prototype.toString.apply(o);
     * </code></pre>
     *
     * Обратите внимание, что этот способ идентификации неизвестных объектов годится только для встроенных объектов.
     * Если вы определяете собственный класс объектов, то класс для него будет соответствовать значению «Object». В этом
     * случае дополнительную информацию об объекте позволит получить свойство <code>Object.constructor</code>.<br/>
     * Метод <code>toString()</code> может быть очень полезен при отладке JavaScript-программ – он позволяет выводить
     * объекты и видеть их значения. По одной только этой причине есть смысл определять метод <code>toString()</code>
     * для каждого создаваемого вами класса.<br/>
     * Несмотря на то что метод <code>toString()</code> обычно вызывается системой автоматически, бывают случаи, когда
     * его требуется вызвать явно. Например, чтобы выполнить явное преобразование объекта в строку, если JavaScript не
     * делает это автоматически:
     * <pre><code>
     *     y = Math.sqrt(x); // Вычислить число
     *     yStr = y.toString(); // Преобразовать его в строку
     * </code></pre>
     *
     * Относительно этого примера следует помнить, что числа имеют встроенный метод <code>toString()</code>,
     * обеспечивающий принудительное преобразование.<br/>
     * В других случаях вызов <code>toString()</code> может оказаться полезным – даже в таком контексте, когда
     * JavaScript выполняет преобразование автоматически. Явное использование метода <code>toString()</code> может
     * сделать программный код более понятным:
     * <pre><code>
     *     alert(myObj.toString());
     * </code></pre>
     *
     * @returns {string} Строка, представляющая <em>объект</em>.
     *
     * @see Object#constructor
     * @see Object#toLocaleString
     * @see Object#valueOf
     * @since Standard ECMA-262 1st. Edition
     */
    Object.prototype.toString = () => '[object Object]';

    /**
     * Элементарное значение указанного объекта. Элементарное значение, связанное с объектом, если оно есть. Если с
     * объектом не связано значение, метод возвращает сам объект.<br/>
     *
     * Метод <code>valueOf()</code> объекта возвращает элементарное значение, связанное с этим объектом, если оно есть.
     * Для объектов типа <code>Object</code> элементарное значение отсутствует, и метод такого объекта возвращает сам
     * объект.<br/>
     *
     * Однако для объектов типа <code>Number</code> метод <code>valueOf()</code> возвращает элементарное числовое
     * значение, представляемое объектом. Аналогично он возвращает элементарное логическое значение, связанное с
     * объектом <code>Boolean</code>, или строку, связанную с объектом <code>String</code>.<br/>
     *
     * Программисту редко приходится явно вызывать метод <code>valueOf()</code>. Интерпретатор JavaScript делает это
     * автоматически всякий раз, встретив объект там, где ожидается элементарное значение. Из-за автоматического вызова
     * метода <code>valueOf()</code> фактически трудно даже провести различие между элементарными значениями и
     * соответствующими им объектами. Оператор <code>typeof</code>, например, показывает различие между строками и
     * объектами <code>String</code>, но с практической точки зрения они работают в JavaScript-коде эквивалентным
     * образом.<br/>
     *
     * Метод <code>valueOf()</code> объектов <code>Number</code>, <code>Boolean</code> и <code>String</code> преобразует
     * эти объекты-обертки в представляемые ими элементарные значения. Конструктор <code>Object()</code> выполняет
     * противоположную операцию при вызове с числовым, логическим или строковым аргументом: он «заворачивает»
     * элементарное значение в соответствующий объект обертку. В большинстве случаев JavaScript берет это преобразование
     * «элементарное значение – объект» на себя, поэтому необходимость в таком вызове конструктора <code>Object()</code>
     * возникает редко.<br/>
     *
     * Иногда программисту требуется определить специальный метод <code>valueOf()</code> для собственных объектов.
     * Например, определить объектный JavaScript-тип для представления комплексных чисел (вещественное число плюс мнимое
     * число). Как часть этого объектного типа можно определить методы для выполнения комплексного сложения, умножения и
     * т.д. Еще может потребоваться возможность рассматривать комплексные числа как обычные вещественные путем
     * отбрасывания мнимой части. Для этого можно сделать примерно следующее:
     * <pre><code class="javascript">
     *     Complex.prototype.valueOf = new Function("return this.real");
     * </code></pre>
     *
     * Определив метод <code>valueOf()</code> для собственного объектного типа <code>Complex</code>, можно, например,
     * передавать объекты комплексных чисел в функцию <code>Math.sqrt()</code>, которая вычислит квадратный корень из
     * вещественной части комплексного числа.
     *
     * @returns {number|boolean|string|*}
     *
     * @see Object#toString
     * @since Standard ECMA-262 3rd. Edition (ECMAScript 3)
     */
    Object.prototype.valueOf = () => this;

    return Object;

})(Symbol('prototype'), Symbol('extensible'));