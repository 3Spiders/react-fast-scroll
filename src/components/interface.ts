export type HTMLAttribute = 'scrollTop' | 'scrollHeight' | 'clientHeight';

export interface ICore {
  el: HTMLElement,
  options?: IOptions
};

export type EventType = 'pullUp' | 'pullDown' | 'pullingDown' | 'cancelPullDown' | 'resetPullUp' | 'scroll' | 'touchstart' | 'touchmove' | 'touchend';

export interface IDown {
  offset: number,
  bounceTime: number,
  dampRateBegin: number,
  dampRate: number,
  isLock: boolean
}

export interface IDefaultDown {
  offset?: number,
  bounceTime?: number,
  dampRateBegin?: number,
  dampRate?: number,
  isLock?: boolean
}

export interface IUp {
  offset: number,
  isLock: boolean,
  isAutoLoad: boolean
}

export interface IDefaultUp {
  offset?: number,
  isLock?: boolean,
  isAutoLoad?: boolean
}

export type EventCallback = (...args: any[]) => void;

export type IDimension = 'X' | 'Y';

export type IEvents = {
  [key in EventType]: EventCallback;
};

export interface IDefaultOptions {
  useBodyScroll: boolean,
  isLockX: boolean,
  isLoadFull: boolean,
  disablePullDown: boolean,
  defaultReloadCnt: number,
  defaultReloadTimer: number,
  throttleScrollTimer: number,
  down: IDown,
  up: IUp,
};

export interface IOptions {
  useBodyScroll?: boolean,
  isLockX?: boolean,
  isLoadFull?: boolean,
  disablePullDown?: boolean,
  defaultReloadCnt?: number,
  defaultReloadTimer?: number,
  throttleScrollTimer?: number,
  down?: IDefaultDown,
  up?: IDefaultUp,
}