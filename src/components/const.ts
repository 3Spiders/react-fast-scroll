import { EventType, IEvents, IEvent, IHooks } from "./interface";

export const EventCollect: EventType[] = [
  'pullUp',
  'pullDown',
  'pullingDown',
  'cancelPullDown',
  'resetPullUp',
  'scroll',
  'touchstart',
  'touchmove',
  'touchend',
];

const _Event: any = {};
const _Events: any = {};
const _Hooks: any = {};

EventCollect.forEach(event => {
  _Event[event] = event;
  _Events[event] = null;
  _Hooks[event] = [];
});

export const Event: IEvent = _Event;
export const Events: IEvents = _Events;
export const Hooks: IHooks = _Hooks;

export const DefaultOptions = {
  useBodyScroll: false,
  isLockX: false,
  isLoadFull: true,
  disablePullDown: false,
  defaultReloadCnt: 3,
  defaultReloadTimer: 300,
  throttleScrollTimer: 0,
  down: {
    offset: 100,
    bounceTime: 300,
    dampRateBegin: 1,
    dampRate: 0.3,
    isLock: false
  },
  up: {
    offset: 0,
    isLock: false,
    isAutoLoad: true
  },
};

export const PER_SECOND = 1000 / 60;