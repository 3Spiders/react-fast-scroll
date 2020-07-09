import { IEventType, IEvents, IEvent, IHooks } from "./interface";

export const EventType: IEventType[] = [
  'PULL_UP',
  'PULL_DOWN',
  'PULLING_DOWN',
  'CANCEL_PULL_DOWN',
  'RESET_PULL_UP',
  'SCROLL',
  'TOUCHSTART',
  'TOUCHMOVE',
  'TOUCHEND',
];

const _Event: any = {};
const _Events: any = {};
const _Hooks: any = {};

EventType.forEach(event => {
  _Event[event] = event;
  _Events[event] = null;
  _Hooks[event] = [];
});

export const Event: IEvent = _Event;
export const Events: IEvents = _Events;
export const Hooks: IHooks = _Hooks;

export const DefaultOptions = {
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
    dampRate: 0.3,
  },
  up: {
    enable: true,
    offset: 0,
    isAutoLoad: true,
    loadFull: {
      enable: true,
      loadCount: 3,
      time: 300,
    }
  },
};

export const PER_SECOND = 1000 / 60;