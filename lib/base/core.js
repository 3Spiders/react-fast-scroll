"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreDecorators = require("core-decorators");

var _const = require("./const");

var _utils = require("./utils");

var _scroll = _interopRequireDefault(require("./scroll"));

var _lodash = require("lodash");

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Todo
 * 1、全屏自动加载有问题。
 * @class Core
 */
var Core = (0, _coreDecorators.autobind)(_class = (_temp = /*#__PURE__*/function () {
  // 滚动元素
  // 滚动元素下面的一个子元素，用于操作下拉刷新的transform动画
  // 所有注册事件以及回调
  // 是否处于上拉状态
  // 是否处于下拉状态
  // 下拉了多少距离
  // 是否已经没有更多数据
  // 全屏加载的时间
  // 全屏加载的次数
  // scrollTop，判断是否在顶部，与下拉刷新有关
  // 是否是横向滚动
  // 是否处于下拉刷新的回弹状态
  // 是否是向下拉
  // 是否处于scrollTo的滚动状态
  // 上一次的scrollTop值
  // 滚动截流的函数
  function Core(options) {
    var _this = this;

    _classCallCheck(this, Core);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "content", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "events", void 0);

    _defineProperty(this, "isPullingUp", void 0);

    _defineProperty(this, "isPullingDown", void 0);

    _defineProperty(this, "pullingDownHeight", void 0);

    _defineProperty(this, "isFinishUp", void 0);

    _defineProperty(this, "initTimer", void 0);

    _defineProperty(this, "loadFullTimer", void 0);

    _defineProperty(this, "loadFullCnt", void 0);

    _defineProperty(this, "startTop", void 0);

    _defineProperty(this, "startX", void 0);

    _defineProperty(this, "startY", void 0);

    _defineProperty(this, "preY", void 0);

    _defineProperty(this, "documentClientHeight", void 0);

    _defineProperty(this, "isHorizontal", void 0);

    _defineProperty(this, "isBouncing", void 0);

    _defineProperty(this, "isMoveDown", void 0);

    _defineProperty(this, "executingScrollTo", void 0);

    _defineProperty(this, "preScrollTop", void 0);

    _defineProperty(this, "throttleScroll", void 0);

    this.container = options.container;
    this.options = (0, _lodash.merge)({}, _const.DefaultOptions, options);
    this.isPullingUp = false;
    this.isPullingDown = false;
    this.pullingDownHeight = 0;
    this.initTimer = 0;
    this.loadFullTimer = 0;
    this.isFinishUp = false;
    this.loadFullCnt = 0;
    this.startTop = null;
    this.startY = 0;
    this.startX = 0;
    this.preY = 0;
    this.isHorizontal = false;
    this.isBouncing = false;
    this.isMoveDown = false;
    this.executingScrollTo = false;
    this.preScrollTop = 0;
    this.documentClientHeight = (0, _utils.getDocumentValue)('clientHeight');
    this.events = _const.Events;
    this.throttleScroll = (0, _lodash.throttle)(function () {
      _this.scroll();
    }, this.options.throttleTime);

    if (this.container instanceof HTMLElement) {
      this.content = this.container.children[0];

      if (!this.content) {
        _scroll.default.warning('The Scroll element need at least one child element.');

        return;
      }
    } else {
      _scroll.default.warning('The Scroll element is required');

      this.content = document.createElement('div');
      return;
    }

    if (this.options.isUseBodyScroll) this.container = document.body;
    this.init();
  }

  _createClass(Core, [{
    key: "pullUp",
    value: function pullUp() {
      var _this$events$Event$pu, _this$events;

      var showLoading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.isPullingUp = true;
      (_this$events$Event$pu = (_this$events = this.events)[_const.Event.pullUp]) === null || _this$events$Event$pu === void 0 ? void 0 : _this$events$Event$pu.call(_this$events, showLoading);
    }
  }, {
    key: "pullDown",
    value: function pullDown() {
      var _this$events$Event$pu2, _this$events2;

      this.isPullingDown = true;
      this.translateContentDom(this.options.down.offset, this.options.down.bounceTime);
      (_this$events$Event$pu2 = (_this$events2 = this.events)[_const.Event.pullDown]) === null || _this$events$Event$pu2 === void 0 ? void 0 : _this$events$Event$pu2.call(_this$events2, this.pullingDownHeight, this.options.down.offset);
    }
  }, {
    key: "resetOptions",
    value: function resetOptions(options) {
      this.options = (0, _lodash.merge)({}, this.options, options);
    }
  }, {
    key: "resetPullUp",
    value: function resetPullUp() {
      var _this$events$Event$re, _this$events3;

      if (this.isFinishUp) {
        this.isFinishUp = false;
      }

      if (this.isPullingUp) {
        this.isPullingUp = false;
      }

      (_this$events$Event$re = (_this$events3 = this.events)[_const.Event.resetPullUp]) === null || _this$events$Event$re === void 0 ? void 0 : _this$events$Event$re.call(_this$events3);
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(y) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // 最大可滚动的y
      var maxY = this.getElementValue('scrollHeight') - this.getElementValue('clientHeight');
      var translateY = Math.max(y, 0);
      translateY = Math.min(translateY, maxY);
      var diff = this.getElementValue('scrollTop') - translateY;

      if (diff === 0 || duration === 0) {
        return this.setScrollTop(translateY);
      } // 每秒60帧，计算每一帧步长


      var count = Math.floor(duration / _const.PER_SECOND);
      var step = diff / count;
      var cur = 0;

      var execute = function execute() {
        if (cur < count) {
          if (cur === count - 1) {
            // 最后一次直接设置y,避免计算误差
            _this2.setScrollTop(translateY);

            _this2.container.scrollTop = translateY;
          } else {
            _this2.setScrollTop(_this2.getElementValue('scrollTop') - step);
          }

          cur += 1;
          requestAnimationFrame(execute);
        } else {
          _this2.setScrollTop(translateY);

          _this2.executingScrollTo = false;
        }
      }; // 锁定状态


      this.executingScrollTo = true;
      requestAnimationFrame(execute);
    }
  }, {
    key: "addEvent",
    value: function addEvent(event, callback) {
      if (event && typeof callback === 'function') {
        this.events[event] = callback;
      }
    } // 没有更多数据

  }, {
    key: "endPullUp",
    value: function endPullUp(isFinishUp) {
      if (this.isPullingUp) {
        this.isPullingUp = false;
      }

      if (isFinishUp) {
        this.isFinishUp = true;
      } else {
        this.options.up.loadFull.enable && this.loadFullScreen();
      }
    }
  }, {
    key: "endPullDown",
    value: function endPullDown(isFinishUp) {
      if (this.isPullingDown) {
        this.translateContentDom(0, this.options.down.bounceTime);
        this.removeContentDomAnimation();
        this.isPullingDown = false;
      } // 如果还有数据，重置上拉状态


      !isFinishUp && this.resetPullUp();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.clearTimer();
      this.removeEvent();
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      this.initPullDown();
      this.initPullUp(); // 执行要在addEvent事件注册之后

      this.initTimer = window.setTimeout(function () {
        if (_this3.options.up.isAutoLoad) {
          _this3.pullUp();
        }
      });
    }
  }, {
    key: "initPullDown",
    value: function initPullDown() {
      this.addScrollDomAnimation();
      this.container.addEventListener('touchstart', this.touchstart); // 当需要阻止默认事件，需要加上passive: false，不然transform会和滚动一起触发。

      this.container.addEventListener('touchmove', this.touchmove, {
        passive: false
      });
      this.container.addEventListener('touchend', this.touchend);
    }
  }, {
    key: "initPullUp",
    value: function initPullUp() {
      var dom = this.options.isUseBodyScroll ? window : this.container;

      if (this.options.throttle) {
        dom.addEventListener('scroll', this.throttleScroll, {
          passive: true
        });
      } else {
        dom.addEventListener('scroll', this.scroll, {
          passive: true
        });
      }
    }
  }, {
    key: "scroll",
    value: function scroll() {
      var _this$events$Event$sc, _this$events4;

      var scrollTop = this.getElementValue('scrollTop');
      var scrollHeight = this.getElementValue('scrollHeight');
      var clientHeight = this.getElementValue('clientHeight');
      var direction = scrollTop - this.preScrollTop;
      this.preScrollTop = scrollTop;
      (_this$events$Event$sc = (_this$events4 = this.events)[_const.Event.scroll]) === null || _this$events$Event$sc === void 0 ? void 0 : _this$events$Event$sc.call(_this$events4, scrollTop); // 触发了下拉刷新或者上拉加载更多，即退出

      if (this.isPullingUp || this.isPullingDown || this.executingScrollTo || direction < 0) return; // if (!this.options.up.enable && !this.isFinishUp && scrollHeight > 0) {

      if (!this.isFinishUp && scrollHeight > 0) {
        var toBottom = scrollHeight - clientHeight - scrollTop;

        if (toBottom <= this.options.up.offset) {
          // 满足上拉加载
          if (!this.isPullingUp && !this.isFinishUp) {
            this.pullUp();
          }
        }
      }
    }
  }, {
    key: "touchstart",
    value: function touchstart(e) {
      var _this$events$Event$to, _this$events5;

      (_this$events$Event$to = (_this$events5 = this.events)[_const.Event.touchstart]) === null || _this$events$Event$to === void 0 ? void 0 : _this$events$Event$to.call(_this$events5, e);
      this.startTop = this.getElementValue('scrollTop');
      this.startY = this.getTouchPosition(e, 'Y');
      this.startX = this.getTouchPosition(e, 'X');
    }
  }, {
    key: "touchmove",
    value: function touchmove(e) {
      var _this$events$Event$to2, _this$events6;

      (_this$events$Event$to2 = (_this$events6 = this.events)[_const.Event.touchmove]) === null || _this$events$Event$to2 === void 0 ? void 0 : _this$events$Event$to2.call(_this$events6, e); // if (this.startTop !== null && this.startTop <= 0 && !this.isPullingDown && !this.options.down.enable) {

      if (this.startTop !== null && this.startTop <= 0 && !this.isPullingDown) {
        var curX = this.getTouchPosition(e, 'X');
        var curY = this.getTouchPosition(e, 'Y'); // 手指滑出屏幕触发刷新

        if (curY > this.documentClientHeight) {
          return this.touchend(e);
        }

        if (!this.preY) this.preY = curY;
        var diff = curY - this.preY;
        this.preY = curY;
        var moveY = curY - this.startY;
        var moveX = curX - this.startX;

        if (this.options.isLockX && !this.isHorizontal) {
          this.isHorizontal = Math.abs(moveX) > Math.abs(moveY);
        }

        if (this.isHorizontal) {
          return e.preventDefault();
        }

        if (this.isBouncing) return;

        if (moveY > 0) {
          var _this$events$Event$pu3, _this$events7;

          this.isMoveDown = true; // 阻止浏览器的默认滚动事件，因为这时候只需要执行动画即可

          e.preventDefault();
          var _this$options$down = this.options.down,
              offset = _this$options$down.offset,
              dampRateBegin = _this$options$down.dampRateBegin,
              dampRate = _this$options$down.dampRate;
          var rate = 1;

          if (this.pullingDownHeight < offset) {
            rate = dampRateBegin;
          } else {
            rate = dampRate;
          } // 添加阻尼系数


          if (diff >= 0) {
            this.pullingDownHeight += diff * rate;
          } else {
            this.pullingDownHeight = Math.max(0, this.pullingDownHeight + diff * rate);
          }

          (_this$events$Event$pu3 = (_this$events7 = this.events)[_const.Event.pullingDown]) === null || _this$events$Event$pu3 === void 0 ? void 0 : _this$events$Event$pu3.call(_this$events7, this.pullingDownHeight);
          this.translateContentDom(this.pullingDownHeight);
        } else {
          this.isBouncing = true;
        }
      }
    }
  }, {
    key: "touchend",
    value: function touchend(e) {
      var _this$events$Event$to3, _this$events8;

      (_this$events$Event$to3 = (_this$events8 = this.events)[_const.Event.touchend]) === null || _this$events$Event$to3 === void 0 ? void 0 : _this$events$Event$to3.call(_this$events8, e); // 下拉刷新之后自动回弹

      if (this.isMoveDown) {
        if (this.pullingDownHeight >= this.options.down.offset) {
          this.pullDown();
        } else {
          var _this$events$Event$ca, _this$events9;

          this.translateContentDom(0, this.options.down.bounceTime);
          this.removeContentDomAnimation();
          (_this$events$Event$ca = (_this$events9 = this.events)[_const.Event.cancelPullDown]) === null || _this$events$Event$ca === void 0 ? void 0 : _this$events$Event$ca.call(_this$events9);
        }

        this.isMoveDown = false;
      }

      this.startY = 0;
      this.startX = 0;
      this.preY = 0;
      this.startTop = null;
      this.isBouncing = false;
      this.isHorizontal = false;
    } // 解决HTML DTD问题

  }, {
    key: "setScrollTop",
    value: function setScrollTop(value) {
      if (this.options.isUseBodyScroll) {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
      } else {
        this.container.scrollTop = value;
      }
    }
  }, {
    key: "getTouchPosition",
    value: function getTouchPosition(e) {
      var _e$touches$;

      var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'X';
      var key2 = dimension === 'X' ? 'pageX' : 'pageY';
      return (_e$touches$ = e.touches[0]) === null || _e$touches$ === void 0 ? void 0 : _e$touches$[key2];
    }
  }, {
    key: "getElementValue",
    value: function getElementValue(val) {
      var isUseBodyScroll = this.options.isUseBodyScroll;
      return isUseBodyScroll ? (0, _utils.getDocumentValue)(val) : this.container[val];
    }
  }, {
    key: "addScrollDomAnimation",
    value: function addScrollDomAnimation() {
      this.container.style.webkitTransitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
      this.container.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
    }
  }, {
    key: "removeContentDomAnimation",
    value: function removeContentDomAnimation() {
      this.content.style.webkitTransform = 'none';
      this.content.style.transform = 'none';
    }
  }, {
    key: "translateContentDom",
    value: function translateContentDom() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // 改变pullingDownHeight， 这个参数关乎逻辑
      this.pullingDownHeight = y; // 改变wrap的位置（css动画）

      var wrap = this.content;
      wrap.style.webkitTransitionDuration = "".concat(duration, "ms");
      wrap.style.transitionDuration = "".concat(duration, "ms");
      wrap.style.webkitTransform = "translate(0px, ".concat(y, "px) translateZ(0px)");
      wrap.style.transform = "translate(0px, ".concat(y, "px) translateZ(0px)");
    }
  }, {
    key: "loadFullScreen",
    value: function loadFullScreen() {
      var _this4 = this;

      // && wrapper.scrollHeight - options.loadingHeight <= getClientHeightByDom(wrapper) scrollHeight是网页内容高度（最小值是clientHeight），需要减去loading的高度50
      if ( // !this.options.up.isLock
      this.loadFullCnt <= this.options.up.loadFull.loadCount && this.getElementValue('scrollTop') === 0 // 避免无法计算高度时无限加载
      && this.getElementValue('scrollHeight') > 0 && this.getElementValue('scrollHeight') <= this.getElementValue('clientHeight')) {
        clearTimeout(this.loadFullTimer);
        this.loadFullTimer = window.setTimeout(function () {
          if (_this4.loadFullCnt < _this4.options.up.loadFull.loadCount) {
            _this4.loadFullCnt++;

            _this4.pullUp();
          } else {
            _this4.loadFullCnt = 0;

            _this4.endPullUp(true);
          }
        }, this.options.up.loadFull.time);
      } else {
        if (this.loadFullCnt) this.loadFullCnt = 0;
      }
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      clearTimeout(this.initTimer);
      clearTimeout(this.loadFullTimer);
    }
  }, {
    key: "removeEvent",
    value: function removeEvent() {
      var dom = this.options.isUseBodyScroll ? window : this.container;

      if (this.options.throttle) {
        dom.removeEventListener('scroll', this.throttleScroll);
      } else {
        dom.removeEventListener('scroll', this.scroll);
      }

      this.container.removeEventListener('touchstart', this.touchstart);
      this.container.removeEventListener('touchmove', this.touchmove);
      this.container.removeEventListener('touchend', this.touchend);
    }
  }]);

  return Core;
}(), _temp)) || _class;

var _default = Core;
exports.default = _default;