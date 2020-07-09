"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _const = require("./const");

var _core = _interopRequireDefault(require("./core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Scroll = /*#__PURE__*/function (_Core) {
  _inherits(Scroll, _Core);

  var _super = _createSuper(Scroll);

  _createClass(Scroll, null, [{
    key: "warning",
    value: function warning(msg) {
      console.error("[react-fast-scroll]: ".concat(msg));
    }
  }, {
    key: "info",
    value: function info(msg) {
      console.info("[react-fast-scroll]: ".concat(msg));
    }
  }]);

  function Scroll(options) {
    var _this;

    _classCallCheck(this, Scroll);

    _this = _super.call(this, options);

    _defineProperty(_assertThisInitialized(_this), "hooks", void 0);

    _this.hooks = _const.Hooks;

    _this.initEvent();

    return _this;
  } // 重载用法 https://stackoverflow.com/questions/39689763/typescript-duplicate-function-implementation
  // 与 addEventListener 类似


  _createClass(Scroll, [{
    key: "on",
    value: function on(type, fn) {
      this.hooks[type].push(fn);
    }
  }, {
    key: "trigger",
    value: function trigger(type) {
      var hooks = this.hooks[type];
      if (!hooks) return;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iterator = _createForOfIteratorHelper(hooks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _fn2 = _step.value;

          _fn2.apply(this, args);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } // 与 removeEventListener 类似，都需要传入函数引用

  }, {
    key: "off",
    value: function off(type, fn) {
      var hooks = this.hooks[type];
      if (!hooks) return;
      this.hooks[type] = this.hooks[type].filter(function (_fn) {
        return _fn !== fn;
      });
    }
  }, {
    key: "initEvent",
    value: function initEvent() {
      var _this2 = this;

      this.addEvent(_const.Event.pullDown, function (height, offset) {
        _this2.hooks[_const.Event.pullDown] && _this2.trigger(_const.Event.pullDown, height, offset);
      });
      this.addEvent(_const.Event.pullUp, function (showLoading) {
        _this2.hooks[_const.Event.pullUp] && _this2.trigger(_const.Event.pullUp, showLoading);
      });
      this.addEvent(_const.Event.pullingDown, function (height, offset) {
        _this2.hooks[_const.Event.pullingDown] && _this2.trigger(_const.Event.pullingDown, height, offset);
      });
      this.addEvent(_const.Event.scroll, function (scrollTop) {
        _this2.hooks[_const.Event.scroll] && _this2.trigger(_const.Event.scroll, scrollTop);
      });
      this.addEvent(_const.Event.cancelPullDown, function () {
        _this2.hooks[_const.Event.cancelPullDown] && _this2.trigger(_const.Event.cancelPullDown);
      });
      this.addEvent(_const.Event.touchstart, function (e) {
        _this2.hooks[_const.Event.touchstart] && _this2.trigger(_const.Event.touchstart, e);
      });
      this.addEvent(_const.Event.touchmove, function (e) {
        _this2.hooks[_const.Event.touchmove] && _this2.trigger(_const.Event.touchmove, e);
      });
      this.addEvent(_const.Event.touchend, function (e) {
        _this2.hooks[_const.Event.touchend] && _this2.trigger(_const.Event.touchend, e);
      });
    }
  }]);

  return Scroll;
}(_core.default);

exports.default = Scroll;