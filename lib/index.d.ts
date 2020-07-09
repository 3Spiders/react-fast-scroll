import React from 'react';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>
};

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

interface IProps {
  pullUp: () => Promise<boolean>,
  pullDown: () => Promise<boolean>,
  requestErrorTime: number, // 请求多少秒未响应，错误提示
  pullDownTime: number,
  pullDownBounceTime: number, // 下拉回弹延迟结束的时间
  showLoading: boolean,
  finishUpContent: string,
  pullDownContent: string,
  errorContent: string,
  height: number,
  customNoData: boolean,
}

interface IState {
  isFinishUp: boolean;
  isBeforePullDown: boolean;
  isPullingDown: boolean;
  isPullingUp: boolean;
  isPullUpError: boolean;
}

export type IPartialOptions = DeepPartial<IOptions>;

declare class ScrollView extends React.Component<Partial<IProps & IPartialOptions>, IState> {

};

export default ScrollView;