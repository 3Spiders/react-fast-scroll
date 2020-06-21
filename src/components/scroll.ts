import { IOptions, Event, EventType } from './interface';
import Core from './core';

type IHooks = {
  [key in EventType]?: any;
};

export default class Scroll extends Core {
  hooks: IHooks;

  static warning(msg: string) {
    console.error(`[react-fast-scroll]: ${msg}`);
  }

  static info(msg: string) {
    console.info(`[react-fast-scroll]: ${msg}`);
  }

  constructor(el: HTMLElement, options?: IOptions) {
    super({ el, options });
    this.hooks = {};
    this.initEvent();
  }

  // 执行对应的外部生命周期
  public on(type: EventType, fn: (...args: any[]) => void, context?: any) {
    if (!this.hooks[type]) {
      this.hooks[type] = [];
    }

    this.hooks[type].push([fn, context]);
  }

  public trigger(...args: any[]) {
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

  public off(type: EventType, fn: () => void) {
    const hooks = this.hooks[type];
    if (!hooks) return;

    let count = hooks.length;
    while (count--) {
      if (hooks[count][0] === fn || (hooks[count][0] && hooks[count][0].fn === fn)) {
        this.spliceOne(hooks, count);
      }
    }
  }

  private spliceOne(list: [], index: number) {
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