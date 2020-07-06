import { IPartialOptions,  EventType, IContainer,  } from './interface';
import { Event, Hooks } from './const';
import Core from './core';

type IHooks = {
  [key in EventType]:  Array<Array<any>>;
};

export default class Scroll extends Core {
  static warning(msg: string) {
    console.error(`[react-fast-scroll]: ${msg}`);
  }

  static info(msg: string) {
    console.info(`[react-fast-scroll]: ${msg}`);
  }

  hooks: IHooks;

  constructor(options: IPartialOptions & IContainer) {
    super(options);
    this.hooks = Hooks;
    this.initEvent();
  }

  // 执行对应的外部生命周期
  on(type: EventType, fn: Function, context?: any) {
    this.hooks[type].push([fn, context]);
  }

  trigger(...args: any[]) {
    const type = args[0] as EventType;
    const hooks = this.hooks[type];
    if (!hooks) return;

    const len = hooks.length;
    const hooksCopy = [...hooks];
    for (let i = 0; i < len; i++) {
      const hook = hooksCopy[i];
      const [fn, context] = hook;
      if (fn) {
        fn.apply(context, [].slice.call(args, 1));
      }
    }
  }

  off(type: EventType, fn: () => void) {
    const hooks = this.hooks[type];
    if (!hooks) return;

    let count = hooks.length;
    while (count--) {
      if (hooks[count][0] === fn || (hooks[count][0] && hooks[count][0].fn === fn)) {
        this.spliceOne(hooks, count);
      }
    }
  }

  private spliceOne(list: any[][], index: number) {
    // eslint-disable-next-line no-param-reassign
    for (; index + 1 < list.length; index++) {
      list[index] = list[index + 1];
    }
    list.pop();
  }

  private initEvent() {
    this.addEvent(Event.pullDown, (height: number, offset: number) => {
      this.hooks[Event.pullDown] && this.trigger([Event.pullDown], height, offset);
    });

    this.addEvent(Event.pullUp, (showLoading: boolean) => {
      this.hooks[Event.pullUp] && this.trigger([Event.pullUp], showLoading);
    });

    this.addEvent(Event.pullingDown, (height: number, offset: number) => {
      this.hooks[Event.pullingDown] && this.trigger([Event.pullingDown], height, offset);
    });

    this.addEvent(Event.scroll, (scrollTop: number) => {
      this.hooks[Event.scroll] && this.trigger([Event.scroll], scrollTop);
    });

    this.addEvent(Event.cancelPullDown, () => {
      this.hooks[Event.cancelPullDown] && this.trigger([Event.cancelPullDown]);
    });

    this.addEvent(Event.touchstart, (e: TouchEvent) => {
      this.hooks[Event.touchstart] && this.trigger([Event.touchstart], e);
    });

    this.addEvent(Event.touchmove, (e: TouchEvent) => {
      this.hooks[Event.touchmove] && this.trigger([Event.touchmove], e);
    });

    this.addEvent(Event.touchend, (e: TouchEvent) => {
      this.hooks[Event.touchend] && this.trigger([Event.touchend], e);
    });
  }
}