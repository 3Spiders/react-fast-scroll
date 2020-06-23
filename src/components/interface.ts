// 递归将所有属性设置为可选属性
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>
};

export type HTMLAttribute = 'scrollTop' | 'scrollHeight' | 'clientHeight';

export interface ICore {
  el: HTMLElement,
  options?: IPartialOptions
};

export type EventType = 'pullUp' | 'pullDown' | 'pullingDown' | 'cancelPullDown' | 'resetPullUp' | 'scroll' | 'touchstart' | 'touchmove' | 'touchend';

export interface IDown {
  offset: number,
  bounceTime: number,
  dampRateBegin: number,
  dampRate: number,
  isLock: boolean
}

export type IPartialDown = Partial<IDown>;

export interface IUp {
  offset: number,
  isLock: boolean,
  isAutoLoad: boolean
}

export type IPartialUp = Partial<IUp>;

export type EventCallback = (...args: any[]) => void;

export type IDimension = 'X' | 'Y';

export type IEvents = {
  [key in EventType]: EventCallback;
};

export interface IOptions {
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

export type IPartialOptions = DeepPartial<IOptions>;