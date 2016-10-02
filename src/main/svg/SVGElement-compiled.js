"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @interface
 * @extends Element
 * @implements GlobalEventHandlers
 * @implements SVGElementInstance
 *
 * @see https://www.w3.org/TR/SVG2/types.html#InterfaceSVGElement
 */
var SVGElement = function (_Element) {
  _inherits(SVGElement, _Element);

  function SVGElement() {
    _classCallCheck(this, SVGElement);

    /**
     * Представляет атрибут 'class' элемента
     * @type SVGAnimatedString
     */
    var _this = _possibleConstructorReturn(this, (SVGElement.__proto__ || Object.getPrototypeOf(SVGElement)).call(this));

    _this.className = null;

    /**
     * Предоставляет доступ к [кастомизируемым атрибутам
     * данных]{@link https://www.w3.org/TR/SVG2/struct.html#DataAttributes} на элементе. Поведение то же, что и у
     * соответствующего поля интерфейса {@link HTMLElement}
     *
     * @type DOMStringMap
     */
    _this.dataset = null;

    /**
     *
     * @type SVGSVGElement
     */
    _this.ownerSVGElement = null;

    /** @type SVGElement */
    _this.viewportElement = null;

    /** @type number */
    _this.tabIndex = null;
    return _this;
  }

  _createClass(SVGElement, [{
    key: "focus",
    value: function focus() {}
  }, {
    key: "blur",
    value: function blur() {}
  }]);

  return SVGElement;
}(Element);

//# sourceMappingURL=SVGElement-compiled.js.map