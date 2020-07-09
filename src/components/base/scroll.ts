import { IPartialOptions, IEventType, IContainer, IHooks } from './interface';
import { Event, Hooks } from './const';
import Core from './core';

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

  // https://jkchao.github.io/typescript-book-chinese/typings/functions.html#%E9%87%8D%E8%BD%BD
  // 重载用法 https://stackoverflow.com/questions/39689763/typescript-duplicate-function-implementation
  // 与 addEventListener 类似
  on<T1, T2>(type: IEventType, fn: (arg1: T1, arg2: T2) => void): void;
  on<T1>(type: IEventType, fn: (arg1: T1) => void): void;
  on(type: IEventType, fn: (...args: any[]) => void): void {
    this.hooks[type].push(fn);
  }

  trigger<T1, T2>(type: IEventType, arg1: T1, arg2: T2): void;
  trigger<T1>(type: IEventType, arg1: T1): void;
  trigger(type: IEventType): void;
  trigger(type: IEventType, ...args: any[]): void {
    const hooks = this.hooks[type];
    if (!hooks) return;

    for (let fn of hooks) {
      fn.apply(this, args);
    }
  }

  // 与 removeEventListener 类似，都需要传入函数引用
  off(type: IEventType, fn: Function) {
    const hooks = this.hooks[type];
    if (!hooks) return;
    this.hooks[type] = this.hooks[type].filter(_fn => _fn !== fn);
  }

  private initEvent() {
    this.addEvent(Event.PULL_DOWN, (height: number, offset: number) => {
      this.hooks[Event.PULL_DOWN] && this.trigger(Event.PULL_DOWN, height, offset);
    });

    this.addEvent(Event.PULL_UP, (showLoading: boolean) => {
      this.hooks[Event.PULL_UP] && this.trigger(Event.PULL_UP, showLoading);
    });

    this.addEvent(Event.PULLING_DOWN, (height: number, offset: number) => {
      this.hooks[Event.PULLING_DOWN] && this.trigger(Event.PULLING_DOWN, height, offset);
    });

    this.addEvent(Event.SCROLL, (scrollTop: number) => {
      this.hooks[Event.SCROLL] && this.trigger(Event.SCROLL, scrollTop);
    });

    this.addEvent(Event.CANCEL_PULL_DOWN, () => {
      this.hooks[Event.CANCEL_PULL_DOWN] && this.trigger(Event.CANCEL_PULL_DOWN);
    });

    this.addEvent(Event.TOUCHSTART, (e: TouchEvent) => {
      this.hooks[Event.TOUCHSTART] && this.trigger(Event.TOUCHSTART, e);
    });

    this.addEvent(Event.TOUCHMOVE, (e: TouchEvent) => {
      this.hooks[Event.TOUCHMOVE] && this.trigger(Event.TOUCHMOVE, e);
    });

    this.addEvent(Event.TOUCHEND, (e: TouchEvent) => {
      this.hooks[Event.TOUCHEND] && this.trigger(Event.TOUCHEND, e);
    });
  }
}