"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PER_SECOND = exports.DefaultOptions = exports.Hooks = exports.Events = exports.Event = exports.EventCollect = void 0;
var EventCollect = ['pullUp', 'pullDown', 'pullingDown', 'cancelPullDown', 'resetPullUp', 'scroll', 'touchstart', 'touchmove', 'touchend'];
exports.EventCollect = EventCollect;
var _Event = {};
var _Events = {};
var _Hooks = {};
EventCollect.forEach(function (event) {
  _Event[event] = event;
  _Events[event] = null;
  _Hooks[event] = [];
});
var Event = _Event;
exports.Event = Event;
var Events = _Events;
exports.Events = Events;
var Hooks = _Hooks;
exports.Hooks = Hooks;
var DefaultOptions = {
  container: null,
  isLockX: false,
  isUseBodyScroll: false,
  isScrollBar: true,
  throttle: false,
  throttleTime: 0,
  down: {
    enable: true,
    offset: 100,
    bounceTime: 300,
    dampRateBegin: 1,
    dampRate: 0.3
  },
  up: {
    enable: true,
    offset: 0,
    isAutoLoad: true,
    loadFull: {
      enable: true,
      loadCount: 3,
      time: 300
    }
  }
};
exports.DefaultOptions = DefaultOptions;
var PER_SECOND = 1000 / 60;
exports.PER_SECOND = PER_SECOND;