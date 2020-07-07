"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _loading = _interopRequireDefault(require("./loading"));

var _scroll = _interopRequireDefault(require("./base/scroll"));

var _const = require("./base/const");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var defaultProps = {
  requestErrorTime: 10000,
  pullDownTime: 200,
  pullDownBounceTime: 0,
  pullDownContent: '释放刷新',
  showLoading: true,
  finishUpContent: '没有更多数据了',
  errorContent: '加载失败，点击重试',
  customNoData: false // 自定义一条数据都没有的样式。一般是配合没有数据时，有数据之后，一定要置为false，否则上拉会出现问题

};
;
;

var ScrollView = /*#__PURE__*/function (_Component) {
  _inherits(ScrollView, _Component);

  var _super = _createSuper(ScrollView);

  function ScrollView(props) {
    var _this;

    _classCallCheck(this, ScrollView);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "scroll", void 0);

    _defineProperty(_assertThisInitialized(_this), "scrollRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "isBouncing", void 0);

    _defineProperty(_assertThisInitialized(_this), "firstIntoPage", void 0);

    _defineProperty(_assertThisInitialized(_this), "requestErrorTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "pullDownTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "pullDownBounceTimer", void 0);

    _this.scrollRef = /*#__PURE__*/_react.default.createRef();
    _this.scroll = null;
    _this.isBouncing = false;
    _this.firstIntoPage = false;
    _this.requestErrorTimer = 0;
    _this.pullDownTimer = 0;
    _this.pullDownBounceTimer = 0;
    _this.state = {
      isFinishUp: false,
      isBeforePullDown: false,
      isPullingDown: false,
      isPullingUp: false,
      isPullUpError: false
    };
    return _this;
  }

  _createClass(ScrollView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          height = _this$props.height,
          isUseBodyScroll = _this$props.isUseBodyScroll,
          up = _this$props.up,
          down = _this$props.down,
          isLockX = _this$props.isLockX,
          throttle = _this$props.throttle,
          throttleTime = _this$props.throttleTime;
      var container = this.scrollRef.current;
      this.scroll = new _scroll.default({
        container: container,
        isLockX: isLockX,
        isUseBodyScroll: isUseBodyScroll,
        throttleTime: throttleTime,
        throttle: throttle,
        up: up,
        down: down
      });

      if (!isUseBodyScroll) {
        container.style.height = height ? "".concat(height, "px") : '100vh';
      }

      this.initEvent();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.scroll) this.scroll.destroy();
      clearTimeout(this.pullDownTimer);
      clearTimeout(this.pullDownBounceTimer);
      clearTimeout(this.requestErrorTimer);
    }
  }, {
    key: "endPullUp",
    value: function endPullUp() {
      var bol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.setState({
        isFinishUp: bol
      });
      this.scroll.endPullUp(bol);
    }
  }, {
    key: "initEvent",
    value: function initEvent() {
      this.scroll.on(_const.Event.pullUp, this.pullUp, this);
      this.scroll.on(_const.Event.pullingDown, this.pullingDown, this);
      this.scroll.on(_const.Event.pullDown, this.pullDown, this);
      this.scroll.on(_const.Event.cancelPullDown, this.cancelPullDown, this);
    }
  }, {
    key: "cancelPullDown",
    value: function cancelPullDown() {
      this.setState({
        isBeforePullDown: false
      });
    }
  }, {
    key: "pullingDown",
    value: function pullingDown(height) {
      if (this.isBouncing || height <= 0) return;
      this.setState({
        isBeforePullDown: true
      });
    }
  }, {
    key: "pullDown",
    value: function pullDown() {
      var _this2 = this;

      var _this$props2 = this.props,
          pullDown = _this$props2.pullDown,
          pullDownTime = _this$props2.pullDownTime;
      if (!pullDown || this.isBouncing) return;
      this.cancelPullUp();
      this.isBouncing = true;
      this.setState({
        isPullingDown: true,
        isFinishUp: false,
        isBeforePullDown: false,
        isPullUpError: false
      });

      var PromiseSuccessCallback = function PromiseSuccessCallback(finishUp) {
        clearTimeout(_this2.pullDownTimer);
        _this2.pullDownTimer = window.setTimeout(function () {
          _this2.setState({
            isPullingDown: false
          });

          _this2.endPullUp(finishUp);

          _this2.afterPullDown(finishUp);
        }, pullDownTime);
      };

      this.handleRequestError(pullDown).then(PromiseSuccessCallback).catch(function () {
        _this2.setState({
          isPullUpError: true
        });
      });
    }
  }, {
    key: "cancelPullUp",
    value: function cancelPullUp() {
      if (!this.state.isPullingUp) return;
      this.setState({
        isPullingUp: false
      });
      this.endPullUp(false);
    }
  }, {
    key: "afterPullDown",
    value: function afterPullDown(finishUp) {
      var _this3 = this;

      var pullDownBounceTime = this.props.pullDownBounceTime;
      clearTimeout(this.pullDownBounceTimer);
      this.pullDownBounceTimer = window.setTimeout(function () {
        _this3.isBouncing = false;

        _this3.scroll.endPullDown(finishUp);
      }, pullDownBounceTime);
    }
  }, {
    key: "pullUp",
    value: function pullUp(showLoading) {
      var _this4 = this;

      var pullUp = this.props.pullUp;
      var _this$state = this.state,
          isPullingUp = _this$state.isPullingUp,
          isFinishUp = _this$state.isFinishUp;
      if (!pullUp || isPullingUp || isFinishUp) return;
      if (showLoading) this.setState({
        isPullingUp: true
      });

      var PromiseSuccessCallback = function PromiseSuccessCallback(finishUp) {
        if (_this4.firstIntoPage) _this4.firstIntoPage = false;
        if (showLoading) _this4.setState({
          isPullingUp: false
        });

        _this4.endPullUp(finishUp);

        !finishUp && _this4.scroll.resetPullUp();
      };

      this.handleRequestError(pullUp).then(PromiseSuccessCallback).catch(function () {
        _this4.setState({
          isPullingUp: false,
          isPullUpError: true
        });
      });
    }
  }, {
    key: "handleRequestError",
    value: function () {
      var _handleRequestError = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn) {
        var _this5 = this;

        var errorPromise, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errorPromise = new Promise(function (resolve, reject) {
                  clearTimeout(_this5.requestErrorTimer);
                  _this5.requestErrorTimer = window.setTimeout(function () {
                    _scroll.default.info('request callback error');

                    reject(Error('error'));
                  }, _this5.props.requestErrorTime);
                });
                _context.next = 3;
                return Promise.race([fn(), errorPromise]);

              case 3:
                res = _context.sent;
                clearTimeout(this.requestErrorTimer);
                return _context.abrupt("return", res);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleRequestError(_x) {
        return _handleRequestError.apply(this, arguments);
      }

      return handleRequestError;
    }() // Todo 上拉失败之后发起重试

  }, {
    key: "pullUpRetry",
    value: function pullUpRetry() {}
  }, {
    key: "renderPullDown",
    value: function renderPullDown() {
      var pullDownContent = this.props.pullDownContent;
      var _this$state2 = this.state,
          isBeforePullDown = _this$state2.isBeforePullDown,
          isPullingDown = _this$state2.isPullingDown;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-view-down"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-view-down-content",
        style: {
          display: isBeforePullDown ? 'block' : 'none'
        }
      }, pullDownContent), /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-view-down-loading",
        style: {
          display: !isBeforePullDown && isPullingDown ? 'block' : 'none'
        }
      }, /*#__PURE__*/_react.default.createElement(_loading.default, null)));
    }
  }, {
    key: "renderPullUp",
    value: function renderPullUp() {
      var _this$props3 = this.props,
          customNoData = _this$props3.customNoData,
          errorContent = _this$props3.errorContent,
          finishUpContent = _this$props3.finishUpContent,
          showLoading = _this$props3.showLoading;
      var _this$state3 = this.state,
          isPullUpError = _this$state3.isPullUpError,
          isBeforePullDown = _this$state3.isBeforePullDown,
          isPullingDown = _this$state3.isPullingDown,
          isFinishUp = _this$state3.isFinishUp,
          isPullingUp = _this$state3.isPullingUp; // loading第一次不加载，下拉情况下需要隐藏上拉元素

      if (this.firstIntoPage && !showLoading || customNoData) return null;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-view-up",
        style: {
          display: isBeforePullDown || isPullingDown ? 'none' : 'flex'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-view-up-content",
        style: {
          display: isFinishUp ? 'block' : 'none'
        }
      }, finishUpContent), /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-view-up-loading",
        style: {
          display: isPullingUp ? 'block' : 'none'
        }
      }, /*#__PURE__*/_react.default.createElement(_loading.default, null)), /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-view-error",
        onClick: this.pullUpRetry,
        style: {
          display: isPullUpError && !isFinishUp && !isPullingUp ? 'block' : 'none'
        }
      }, errorContent));
    } // eslint-disable-next-line @typescript-eslint/member-ordering

  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          pullUp = _this$props4.pullUp,
          pullDown = _this$props4.pullDown,
          children = _this$props4.children;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-view",
        ref: this.scrollRef
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-view-container"
      }, pullDown && this.renderPullDown(), children, pullUp && this.renderPullUp()));
    }
  }]);

  return ScrollView;
}(_react.Component);

_defineProperty(ScrollView, "defaultProps", defaultProps);

var _default = ScrollView;
exports.default = _default;