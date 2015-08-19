'use strict';

/**
 * @template T
 * @interface
 */
class RevocableProxy {
    constructor() {
        /**
         * Объект <code>{@link Proxy}</code>, созданный при помощи вызова конструкции
         * <code>new Proxy(target, handler)</code>.
         * @type Proxy<T>
         */
        this.proxy = new Proxy({}, {});
    }

    /**
     * Функция, аннулирующая (отключающая) <code>Proxy</code>. Если функция <code>revoke()</code> будет вызвана, прокси
     * становится неиспользуемым: все перехватчики <code>{@link ProxyHandler}</code>`а будут возбуждать
     * <code>{@link TypeError}</code>. Как только прокси будет аннулирован, он будет оставаться аннулированным и может
     * быть собран сборщиком мусора. Вызов <code>revoke()</code> снова не будет иметь никакого эффекта.
     */
    revoke() {}
}