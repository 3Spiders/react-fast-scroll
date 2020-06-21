export type HTMLAttribute = 'scrollTop' | 'scrollHeight' | 'clientHeight';

export interface ICore {
  el: HTMLElement,
  options?: IOptions
};

export type EventType = 'pullUp' | 'pullDown' | 'pullingDown' | 'cancelPullDown' | 'resetPullUp' | 'scroll' | 'touchstart' | 'touchmove' | 'touchend';

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

type event = (s?: number | TouchEvent | boolean, m?: any) => void;

export type IDimension = 'X' | 'Y';

export interface IEvents {
  [key: string]: event
}

export interface IDefaultOptions {
  useBodyScroll: boolean,
  isLockX: boolean,
  isLoadFull: boolean,
  disablePullDown: boolean,
  defaultReloadCnt: number,
  defaultReloadTimer: number,
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
  down?: IDefaultDown,
  up?: IDefaultUp,
}