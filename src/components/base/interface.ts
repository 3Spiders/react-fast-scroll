// 递归将所有属性设置为可选属性
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>
};

export type HTMLAttribute = 'scrollTop' | 'scrollHeight' | 'clientHeight';

export type IDimension = 'X' | 'Y';

export type IEventType = 'PULL_UP' | 'PULL_DOWN' | 'PULLING_DOWN' | 'CANCEL_PULL_DOWN' | 'RESET_PULL_UP' | 'SCROLL' | 'TOUCHSTART' | 'TOUCHMOVE' | 'TOUCHEND';

export interface IDown {
  offset: number,
  bounceTime: number,
  dampRateBegin: number,
  dampRate: number,
  enable: boolean
}

export interface IUp {
  enable: boolean,
  offset: number,
  isAutoLoad: boolean,
  loadFull: ILoadFull,
}

export type IPartialUp = Partial<IUp>;

export interface ILoadFull {
  enable: boolean,
  loadCount: number,
  time: number,
}

export type IPartialDown = Partial<IDown>;

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

export type IEvents = {
  [key in IEventType]: Function | null;
};

export type IEvent = {
  [key in IEventType]: IEventType;
};

export type IHooks = {
  [key in IEventType]: Array<Function>;
};

export type IPartialOptions = DeepPartial<IOptions>;