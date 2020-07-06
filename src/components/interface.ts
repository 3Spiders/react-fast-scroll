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
  enable: boolean
}

export interface ILoadFull {
  enable: boolean,
  loadCount: number,
  time: number,
}

export type IPartialDown = Partial<IDown>;

export interface IUp {
  enable: boolean,
  offset: number,
  isAutoLoad: boolean,
  loadFull: ILoadFull,
}

export type IPartialUp = Partial<IUp>;

export type IDimension = 'X' | 'Y';

export type IEvents = {
  [key in EventType]: Function | null;
};

export type IEvent = {
  [key in EventType]: EventType;
};

export type IHooks = {
  [key in EventType]: [];
}

export interface IOptions {
  isUseBodyScroll: boolean,
  isLockX: boolean,
  isScrollBar: boolean,
  throttle: boolean,
  throttleTime: number,
  down: IDown,
  up: IUp,
};

export interface IContainer {
  container: HTMLElement,
}

export type IPartialOptions = DeepPartial<IOptions>;