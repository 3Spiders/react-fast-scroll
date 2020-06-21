
import { TouchEvent } from 'react';
import { DefaultOptions, PER_SECOND } from './const';
import { Event, IOptions, IEvents, IDimension, IDefaultOptions, HTMLAttribute, ICore } from './interface';
import { getDocumentValue, getClientHeightByDom, extend } from './utils';
import Scroll from './scroll';

/**
 * Todo，touch事件支持浏览器mouse事件，参数全部设置私有属性
 *  全屏自动加载有问题。
 * @class Core
 */
class Core {
  scrollDom: HTMLElement;
  contentDom: HTMLElement;
  options: IDefaultOptions;
  events: IEvents;
  private isPullingUp: boolean;
  private isPullingDown: boolean;
  private pullingDownHeight: number;
  private isFinishUp: boolean;
  private initTimer: number;
  private loadFullTimer: number;
  private loadFullCnt: number;
  private startTop: number | null;
  private startX: number;
  private startY: number;
  private documentClientHeight: number;
  private preY: number;
  private isHorizontal: boolean;
  private isBouncing: boolean;
  private isMoveDown: boolean;
  private direction: number;
  private executeScrollTo: boolean;
  private preScrollTop: number;

  constructor(core: ICore) {
    this.options = extend(true, {}, DefaultOptions, core.options);
    this.events = {};
    this.isPullingUp = false;
    this.isPullingDown = false;
    this.pullingDownHeight = 0; // 下拉了多少距离
    this.initTimer = 0;
    this.loadFullTimer = 0;
    this.isFinishUp = false;
    this.loadFullCnt = 0;
    this.startTop = null;
    this.startY = 0;
    this.startX = 0;
    this.documentClientHeight = document.documentElement.clientHeight;
    this.preY = 0;
    this.isHorizontal = false;
    this.isBouncing = false;
    this.isMoveDown = false; // 是否向下拉
    this.direction = 0;
    this.executeScrollTo = false;
    this.preScrollTop = 0;

    this.scrollDom = core.el;
    if (this.scrollDom instanceof HTMLElement) {
      this.contentDom = this.scrollDom.children[0] as HTMLElement;
      if (!this.contentDom) {
        Scroll.warning('The Scroll element need at least one child element.');
        return;
      }
    } else {
      Scroll.warning('The Scroll element is required');
      this.contentDom = document.createElement('div');
      return;
    }

    this.init();
  }

  pullUp(showLoading: boolean = true) {
    this.isPullingUp = true;
    this.events[Event.pullUp] && this.events[Event.pullUp](showLoading);
  }

  pullDown() {
    this.isPullingDown = true;
    this.translateContentDom(this.options.down.offset, this.options.down.bounceTime);
    this.events[Event.pullDown] && this.events[Event.pullDown](this.pullingDownHeight, this.options.down.offset);
  }

  resetOptions(options: IOptions) {
    this.options = extend(true, {}, this.options, options);
  }

  resetPullUp() {
    if (this.isFinishUp) {
      this.isFinishUp = false;
    }
    if (this.isPullingUp) {
      this.isPullingUp = false;
    }
    this.events[Event.resetPullUp] && this.events[Event.resetPullUp]();
  }

  scrollTo(y: number, duration: number = 0) {
    // 最大可滚动的y
    const maxY = this.scrollDom.scrollHeight - getClientHeightByDom(this.scrollDom);
    let translateY = Math.max(y, 0);
    translateY = Math.min(translateY, maxY);
    const diff = this.scrollDom.scrollTop - translateY;

    if (diff === 0 || duration === 0) {
      return this.scrollDom.scrollTop = translateY;
    }

    // 每秒60帧，计算每一帧步长
    const count = Math.floor(duration / PER_SECOND);
    const step = diff / count;
    let cur = 0;

    const execute = () => {
      if (cur < count) {
        if (cur === count - 1) {
          // 最后一次直接设置y,避免计算误差
          this.scrollDom.scrollTop = translateY;
        } else {
          this.scrollDom.scrollTop -= step;
        }
        cur += 1;
        requestAnimationFrame(execute);
      } else {
        this.scrollDom.scrollTop = translateY;
        this.executeScrollTo = false;
      }
    };

    // 锁定状态
    this.executeScrollTo = true;
    requestAnimationFrame(execute);
  }

  addEvent(event: string, callback: any) {
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
      this.options.isLoadFull && this.loadFullScreen();
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

  private clearTimer() {
    clearTimeout(this.initTimer);
    clearTimeout(this.loadFullTimer);
  }

  private removeEvent() {
    this.scrollDom.removeEventListener('scroll', this.scroll);
    this.scrollDom.removeEventListener('touchstart', this.touchstart);
    this.scrollDom.removeEventListener('touchmove', this.touchmove);
    this.scrollDom.removeEventListener('touchend', this.touchend);
  }

  private initPullDown() {
    this.addScrollDomAnimation();
    this.scrollDom.addEventListener('touchstart', this.touchstart);
    // 当需要阻止默认事件，需要加上passive: false，不然transform会和滚动一起触发。
    this.scrollDom.addEventListener('touchmove', this.touchmove, { passive: false });
    this.scrollDom.addEventListener('touchend', this.touchend);
  }

  private initPullUp() {
    this.scrollDom.addEventListener('scroll', this.scroll, { passive: true });
  }

  private getTouchPosition(e: TouchEvent, dimension: IDimension = 'X'): number {
    const key2 = dimension === 'X' ? 'pageX' : 'pageY';
    return e.touches[0] && e.touches[0][key2];
  }

  private touchstart = (e: any) => {
    this.events[Event.touchstart] && this.events[Event.touchstart](e);
    this.startTop = this.getElementValue('scrollTop');
    this.startY = this.getTouchPosition(e, 'Y');
    this.startX = this.getTouchPosition(e, 'X');
  }

  private touchmove = (e: any) => {
    this.events[Event.touchmove] && this.events[Event.touchmove](e);

    if (this.startTop !== null && this.startTop <= 0 && !this.isPullingDown && !this.options.down.isLock) {
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

        this.events[Event.pullingDown] && this.events[Event.pullingDown](this.pullingDownHeight);

        this.translateContentDom(this.pullingDownHeight);
      } else {
        this.isBouncing = true;
      }
    }
  }

  private touchend = (e: any) => {
    this.events[Event.touchend] && this.events[Event.touchend]();

    // 下拉刷新之后自动回弹
    if (this.isMoveDown) {
      if (this.pullingDownHeight >= this.options.down.offset) {
        this.pullDown();
      } else {
        this.translateContentDom(0, this.options.down.bounceTime);
        this.removeContentDomAnimation();
        this.events[Event.cancelPullDown] && this.events[Event.cancelPullDown]();
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

  private scroll = () => {
    const scrollTop = this.getElementValue('scrollTop');
    const scrollHeight = this.getElementValue('scrollHeight');
    const clientHeight = this.getElementValue('clientHeight');
    const direction = scrollTop - this.preScrollTop;
    this.preScrollTop = scrollTop;

    this.events[Event.scroll] && this.events[Event.scroll](scrollTop);

    // 触发了下拉刷新或者上拉加载更多，即退出
    if (this.isPullingUp || this.isPullingDown || this.executeScrollTo || direction < 0) return;

    if (!this.options.up.isLock && !this.isFinishUp && scrollHeight > 0) {
      const toBottom = scrollHeight - clientHeight - scrollTop;
      if (toBottom <= this.options.up.offset) {
        // 满足上拉加载
        if (!this.isPullingUp && !this.isFinishUp) {
          this.pullUp();
        }
      }
    }
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

  private getElementValue(val: HTMLAttribute) {
    const { useBodyScroll } = this.options;
    return useBodyScroll ? getDocumentValue(val) : this.scrollDom[val];
  }

  private addScrollDomAnimation() {
    this.scrollDom.style.webkitTransitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
    this.scrollDom.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
  }

  private removeContentDomAnimation() {
    this.contentDom.style.webkitTransform = 'none';
    this.contentDom.style.transform = 'none';
  }

  private translateContentDom(y: number = 0, duration: number = 0) {
    // 改变pullingDownHeight， 这个参数关乎逻辑
    this.pullingDownHeight = y;

    // 改变wrap的位置（css动画）
    const wrap = this.contentDom;

    wrap.style.webkitTransitionDuration = `${duration}ms`;
    wrap.style.transitionDuration = `${duration}ms`;
    wrap.style.webkitTransform = `translate(0px, ${y}px) translateZ(0px)`;
    wrap.style.transform = `translate(0px, ${y}px) translateZ(0px)`;
  }

  private loadFullScreen() {
    if (
      !this.options.up.isLock
      // 避免无法计算高度时无限加载
      && this.getElementValue('scrollTop') === 0
      // scrollHeight是网页内容高度（最小值是clientHeight），需要减去loading的高度50
      && this.getElementValue('scrollHeight') > 0
      // && wrapper.scrollHeight - options.loadingHeight <= getClientHeightByDom(wrapper)
      && this.getElementValue('scrollHeight') <= this.getElementValue('clientHeight')
      && this.loadFullCnt <= this.options.defaultReloadCnt
    ) {
      clearTimeout(this.loadFullTimer);
      this.loadFullTimer = window.setTimeout(() => {
        if (this.loadFullCnt < this.options.defaultReloadCnt) {
          this.loadFullCnt++;
          this.pullUp();
        } else {
          this.loadFullCnt = 0;
          this.endPullUp(true);
        }
      }, this.options.defaultReloadTimer);
    } else {
      if (this.loadFullCnt) this.loadFullCnt = 0;
    }
  }
}

export default Core;