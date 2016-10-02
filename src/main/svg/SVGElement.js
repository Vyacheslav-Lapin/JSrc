/**
 * @interface
 * @extends Element
 * @implements GlobalEventHandlers
 * @implements SVGElementInstance
 *
 * @see https://www.w3.org/TR/SVG2/types.html#InterfaceSVGElement
 */
class SVGElement extends Element {
    constructor() {
        super();

        /**
         * Представляет атрибут 'class' элемента
         * @type SVGAnimatedString
         */
        this.className = null;

        /**
         * Предоставляет доступ к [кастомизируемым атрибутам
         * данных]{@link https://www.w3.org/TR/SVG2/struct.html#DataAttributes} на элементе. Поведение то же, что и у
         * соответствующего поля интерфейса {@link HTMLElement}
         *
         * @type DOMStringMap
         */
        this.dataset = null;

        /**
         *
         * @type SVGSVGElement
         */
        this.ownerSVGElement = null;

        /** @type SVGElement */
        this.viewportElement = null;

        /** @type number */
        this.tabIndex = null;
    }

    focus() {}

    blur() {}
}