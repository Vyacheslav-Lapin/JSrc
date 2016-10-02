/**
 * <code>EventTarget</code> - объект, который вызывается, когда какое-либо событие происходит. Каждый
 * {@link EventTarget} имеет ассоциированный с ним список слушателей событий.<br/>
 *
 * Слушатель событий ассоциирует с обработчиком определённое событие. Каждый слушатель события собержит тип (события),
 * функцию-обработчик и замкнутые переменные.<br/>
 *
 * Важно: Обработчик события называется "EventListener" по историческим причинам. Как можно видеть по нижеследующему
 * описанию, слушатель события - более общая концепция.
 *
 * @interface
 * @see https://www.w3.org/TR/dom/#eventtarget
 */
class EventTarget {

    /**
     * Добавляет слушатель для события, тип которого хатактеризуется значением атрибута <em>type</em>. Аргумент
     * обработчика устанавливает the callback that will be invoked when the event is dispatched. When set to true, the capture argument prevents callback from being invoked if the event's eventPhase attribute value is BUBBLING_PHASE. When false, callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked when event's eventPhase attribute value is AT_TARGET.

     The event listener is appended to target's list of event listeners and is not appended if it is a duplicate, i.e. having the same type, callback, and capture values.
     * @param {string} type
     * @param {EventListener} callback
     * @param {boolean} capture
     */
    addEventListener(type, callback, capture=false) {}

    /**
     *
     * @param {string} type
     * @param {EventListener} callback
     * @param {boolean} capture
     */
    removeEventListener(type, callback, capture=false) {}

    /**
     *
     * @param {Event} event
     * @returns boolean
     */
    dispatchEvent(event) {
        return false;
    }
}