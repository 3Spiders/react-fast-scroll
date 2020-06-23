import { EventType } from "./interface";

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

export const Event = {
  pullUp: 'pullUp' as EventType,
  pullDown: 'pullDown' as EventType,
  pullingDown: 'pullingDown' as EventType,
  cancelPullDown: 'cancelPullDown' as EventType,
  resetPullUp: 'resetPullUp' as EventType,
  scroll: 'scroll' as EventType,
  touchstart: 'touchstart' as EventType,
  touchmove: 'touchmove' as EventType,
  touchend: 'touchend' as EventType,
};

export const Hooks = {
  pullUp: [],
  pullDown: [],
  pullingDown: [],
  cancelPullDown: [],
  resetPullUp: [],
  scroll: [],
  touchstart: [],
  touchmove: [],
  touchend: [],
};

export const PER_SECOND = 1000 / 60;