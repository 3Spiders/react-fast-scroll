
import { autobind } from 'core-decorators';
import { DefaultOptions, PER_SECOND, Event, Events } from './const';
import {  IPartialOptions, IEvents, IDimension, IOptions, HTMLAttribute, ICore, EventType, IContainer } from './interface';
import { getDocumentValue  } from './utils';
import Scroll from './scroll';
import { throttle, merge } from 'lodash';

/**
 * Todo
 * 1、全屏自动加载有问题。
 * @class Core
 */

@autobind
class Core {
  container: HTMLElement; // 滚动元素
  content: HTMLElement; // 滚动元素下面的一个子元素，用于操作下拉刷新的transform动画
  options: IOptions;
  events: IEvents; // 所有注册事件以及回调
  private isPullingUp: boolean;// 是否处于上拉状态
  private isPullingDown: boolean; // 是否处于下拉状态
  private pullingDownHeight: number; // 下拉了多少距离
  private isFinishUp: boolean; // 是否已经没有更多数据
  private initTimer: number;
  private loadFullTimer: number; // 全屏加载的时间
  private loadFullCnt: number; // 全屏加载的次数
  private startTop: number | null; // scrollTop，判断是否在顶部，与下拉刷新有关
  private startX: number;
  private startY: number;
  private preY: number;
  private documentClientHeight: number;
  private isHorizontal: boolean; // 是否是横向滚动
  private isBouncing: boolean; // 是否处于下拉刷新的回弹状态
  private isMoveDown: boolean; // 是否是向下拉
  private executingScrollTo: boolean; // 是否处于scrollTo的滚动状态
  private preScrollTop: number; // 上一次的scrollTop值
  private throttleScroll: () => void; // 滚动截流的函数

  constructor(options: IPartialOptions & IContainer) {
    this.container = options.container;
    this.options = merge({}, DefaultOptions, options);
    this.isPullingUp = false;
    this.isPullingDown = false;
    this.pullingDownHeight = 0;
    this.initTimer = 0;
    this.loadFullTimer = 0;
    this.isFinishUp = false;
    this.loadFullCnt = 0;
    this.startTop = null;
    this.startY = 0;
    this.startX = 0;
    this.preY = 0;
    this.isHorizontal = false;
    this.isBouncing = false;
    this.isMoveDown = false;
    this.executingScrollTo = false;
    this.preScrollTop = 0;
    this.documentClientHeight = getDocumentValue('clientHeight');
    this.events = Events;
    this.throttleScroll = throttle(() => {
      this.scroll();
    }, this.options.throttleTime)

    if (this.container instanceof HTMLElement) {
      this.content = this.container.children[0] as HTMLElement;
      if (!this.content) {
        Scroll.warning('The Scroll element need at least one child element.');
        return;
      }
    } else {
      Scroll.warning('The Scroll element is required');
      this.content = document.createElement('div');
      return;
    }
    if (this.options.isUseBodyScroll) this.container = document.body;

    this.init();
  }

  pullUp(showLoading = true) {
    this.isPullingUp = true;
    this.events[Event.pullUp]?.(showLoading);
  }

  pullDown() {
    this.isPullingDown = true;
    this.translateContentDom(this.options.down.offset, this.options.down.bounceTime);
    this.events[Event.pullDown]?.(this.pullingDownHeight, this.options.down.offset);
  }

  resetOptions(options: IPartialOptions) {
    this.options = merge({}, this.options, options);
  }

  resetPullUp() {
    if (this.isFinishUp) {
      this.isFinishUp = false;
    }
    if (this.isPullingUp) {
      this.isPullingUp = false;
    }
    this.events[Event.resetPullUp]?.();
  }

  scrollTo(y: number, duration = 0) {
    // 最大可滚动的y
    const maxY = this.getElementValue('scrollHeight') - this.getElementValue('clientHeight');
    let translateY = Math.max(y, 0);
    translateY = Math.min(translateY, maxY);
    const diff = this.getElementValue('scrollTop') - translateY;

    if (diff === 0 || duration === 0) {
      return this.setScrollTop(translateY);
    }

    // 每秒60帧，计算每一帧步长
    const count = Math.floor(duration / PER_SECOND);
    const step = diff / count;
    let cur = 0;

    const execute = () => {
      if (cur < count) {
        if (cur === count - 1) {
          // 最后一次直接设置y,避免计算误差
          this.setScrollTop(translateY);
          this.container.scrollTop = translateY;
        } else {
          this.setScrollTop(this.getElementValue('scrollTop') - step);
        }
        cur += 1;
        requestAnimationFrame(execute);
      } else {
        this.setScrollTop(translateY);
        this.executingScrollTo = false;
      }
    };

    // 锁定状态
    this.executingScrollTo = true;
    requestAnimationFrame(execute);
  }

  addEvent(event: EventType, callback: Function) {
    if (event && typeof callback === 'function') {
      this.events[event] = callback;
    }
  }

  // 没有更多数据
  endPullUp(isFinishUp: boolean) {
    if (this.isPullingUp) {
      this.isPullingUp = false;
    }
    if (isFinishUp) {
      this.isFinishUp = true;
    } else {
      this.options.up.loadFull.enable && this.loadFullScreen();
    }
  }

  endPullDown(isFinishUp: boolean) {
    if (this.isPullingDown) {
      this.translateContentDom(0, this.options.down.bounceTime);
      this.removeContentDomAnimation();
      this.isPullingDown = false;
    }
    // 如果还有数据，重置上拉状态
    !isFinishUp && this.resetPullUp();
  }

  destroy() {
    this.clearTimer();
    this.removeEvent();
  }

  private init() {
    this.initPullDown();
    this.initPullUp();

    // 执行要在addEvent事件注册之后
    this.initTimer = window.setTimeout(() => {
      if (this.options.up.isAutoLoad) {
        this.pullUp();
      }
    });
  }

  private initPullDown() {
    this.addScrollDomAnimation();
    this.container.addEventListener('touchstart', this.touchstart);
    // 当需要阻止默认事件，需要加上passive: false，不然transform会和滚动一起触发。
    this.container.addEventListener('touchmove', this.touchmove, { passive: false });
    this.container.addEventListener('touchend', this.touchend);
  }

  private initPullUp() {
    const dom = this.options.isUseBodyScroll ? window : this.container;
    if (this.options.throttle) {
      dom.addEventListener('scroll', this.throttleScroll, { passive: true });
    } else {
      dom.addEventListener('scroll', this.scroll, { passive: true });
    }
  }

  private scroll() {
    const scrollTop = this.getElementValue('scrollTop');
    const scrollHeight = this.getElementValue('scrollHeight');
    const clientHeight = this.getElementValue('clientHeight');
    const direction = scrollTop - this.preScrollTop;
    this.preScrollTop = scrollTop;

    this.events[Event.scroll]?.(scrollTop);

    // 触发了下拉刷新或者上拉加载更多，即退出
    if (this.isPullingUp || this.isPullingDown || this.executingScrollTo || direction < 0) return;

    // if (!this.options.up.enable && !this.isFinishUp && scrollHeight > 0) {
    if (!this.isFinishUp && scrollHeight > 0) {
      const toBottom = scrollHeight - clientHeight - scrollTop;
      if (toBottom <= this.options.up.offset) {
        // 满足上拉加载
        if (!this.isPullingUp && !this.isFinishUp) {
          this.pullUp();
        }
      }
    }
  }

  private touchstart(e: TouchEvent) {
    this.events[Event.touchstart]?.(e);
    this.startTop = this.getElementValue('scrollTop');
    this.startY = this.getTouchPosition(e, 'Y');
    this.startX = this.getTouchPosition(e, 'X');
  }

  private touchmove(e: TouchEvent) {
    this.events[Event.touchmove]?.(e);

    // if (this.startTop !== null && this.startTop <= 0 && !this.isPullingDown && !this.options.down.enable) {
    if (this.startTop !== null && this.startTop <= 0 && !this.isPullingDown) {
      const curX = this.getTouchPosition(e, 'X');
      const curY = this.getTouchPosition(e, 'Y');

      // 手指滑出屏幕触发刷新
      if (curY > this.documentClientHeight) {
        return this.touchend(e);
      }

      if (!this.preY) this.preY = curY;

      const diff = curY - this.preY;

      this.preY = curY;

      const moveY = curY - this.startY;
      const moveX = curX - this.startX;

      if (this.options.isLockX && !this.isHorizontal) {
        this.isHorizontal = Math.abs(moveX) > Math.abs(moveY);
      }

      if (this.isHorizontal) {
        return e.preventDefault();
      }

      if (this.isBouncing) return;

      if (moveY > 0) {
        this.isMoveDown = true;

        // 阻止浏览器的默认滚动事件，因为这时候只需要执行动画即可
        e.preventDefault();

        const { offset, dampRateBegin, dampRate } = this.options.down;
        let rate = 1;
        if (this.pullingDownHeight < offset) {
          rate = dampRateBegin;
        } else {
          rate = dampRate;
        }

        // 添加阻尼系数
        if (diff >= 0) {
          this.pullingDownHeight += diff * rate;
        } else {
          this.pullingDownHeight = Math.max(0, this.pullingDownHeight + (diff * rate));
        }

        this.events[Event.pullingDown]?.(this.pullingDownHeight);

        this.translateContentDom(this.pullingDownHeight);
      } else {
        this.isBouncing = true;
      }
    }
  }

  private touchend(e: TouchEvent) {
    this.events[Event.touchend]?.(e);

    // 下拉刷新之后自动回弹
    if (this.isMoveDown) {
      if (this.pullingDownHeight >= this.options.down.offset) {
        this.pullDown();
      } else {
        this.translateContentDom(0, this.options.down.bounceTime);
        this.removeContentDomAnimation();
        this.events[Event.cancelPullDown]?.();
      }
      this.isMoveDown = false;
    }

    this.startY = 0;
    this.startX = 0;
    this.preY = 0;
    this.startTop = null;
    this.isBouncing = false;
    this.isHorizontal = false;
  }

  // 解决HTML DTD问题
  private setScrollTop(value: number) {
    if (this.options.isUseBodyScroll) {
      document.body.scrollTop = value;
      document.documentElement.scrollTop = value;
    } else {
      this.container.scrollTop = value;
    }
  }

  private getTouchPosition(e: TouchEvent, dimension: IDimension = 'X'): number {
    const key2 = dimension === 'X' ? 'pageX' : 'pageY';
    return e.touches[0]?.[key2];
  }

  private getElementValue(val: HTMLAttribute) {
    const { isUseBodyScroll } = this.options;
    return isUseBodyScroll ? getDocumentValue(val) : this.container[val];
  }

  private addScrollDomAnimation() {
    this.container.style.webkitTransitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
    this.container.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
  }

  private removeContentDomAnimation() {
    this.content.style.webkitTransform = 'none';
    this.content.style.transform = 'none';
  }

  private translateContentDom(y = 0, duration = 0) {
    // 改变pullingDownHeight， 这个参数关乎逻辑
    this.pullingDownHeight = y;

    // 改变wrap的位置（css动画）
    const wrap = this.content;

    wrap.style.webkitTransitionDuration = `${duration}ms`;
    wrap.style.transitionDuration = `${duration}ms`;
    wrap.style.webkitTransform = `translate(0px, ${y}px) translateZ(0px)`;
    wrap.style.transform = `translate(0px, ${y}px) translateZ(0px)`;
  }

  private loadFullScreen() {
    // && wrapper.scrollHeight - options.loadingHeight <= getClientHeightByDom(wrapper) scrollHeight是网页内容高度（最小值是clientHeight），需要减去loading的高度50
    if (
      // !this.options.up.isLock
      this.loadFullCnt <= this.options.up.loadFull.loadCount
      && this.getElementValue('scrollTop') === 0 // 避免无法计算高度时无限加载
      && this.getElementValue('scrollHeight') > 0
      && this.getElementValue('scrollHeight') <= this.getElementValue('clientHeight')
    ) {
      clearTimeout(this.loadFullTimer);
      this.loadFullTimer = window.setTimeout(() => {
        if (this.loadFullCnt < this.options.up.loadFull.loadCount) {
          this.loadFullCnt++;
          this.pullUp();
        } else {
          this.loadFullCnt = 0;
          this.endPullUp(true);
        }
      }, this.options.up.loadFull.time);
    } else {
      if (this.loadFullCnt) this.loadFullCnt = 0;
    }
  }

  private clearTimer() {
    clearTimeout(this.initTimer);
    clearTimeout(this.loadFullTimer);
  }

  private removeEvent() {
    const dom = this.options.isUseBodyScroll ? window : this.container;
    if (this.options.throttle) {
      dom.addEventListener('scroll', this.throttleScroll, { passive: true });
    } else {
      dom.removeEventListener('scroll', this.scroll);
    }
    this.container.removeEventListener('touchstart', this.touchstart);
    this.container.removeEventListener('touchmove', this.touchmove);
    this.container.removeEventListener('touchend', this.touchend);
  }
}

export default Core;