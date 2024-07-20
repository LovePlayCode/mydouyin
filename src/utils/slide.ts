import type { PointerEventHandler } from 'react';
import { _css } from './dom';
import { SlideEnum, SwiperDirectionEnum } from '@/common/contains';
import type { MouseEventState } from '@/components/SlideVerticalInfinite';

/**
 * 检查是否有 PointerEvent 事件
 */
export function checkEvent(e: any) {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  if (!isMobile || (isMobile && e instanceof PointerEvent)) {
    return true;
  }
  return false;
}

/**
 * 开始滑动 slideTouchStart
 */
export function sildeTouchStart(e: any, el: HTMLDivElement, state: any) {
  if (!checkEvent(e)) {
    return;
  }
  // 设置属性
  _css(el, 'transition-duration', '0ms');
  state.start.x = e.pageX;
  state.start.y = e.pageY;
  state.start.time = Date.now();
  state.isDown = true;
}
export function _stopPropagation(e: Event) {
  e.stopImmediatePropagation();
  e.stopPropagation();
  e.preventDefault();
}
export function slideTouchMove(
  e: PointerEvent,
  el: HTMLDivElement,
  state: MouseEventState,
  canNextCb: any,
) {
  if (!checkEvent(e)) {
    return;
  }
  if (!state.isDown) {
    return;
  }
  state.move.x = e.pageX - state.start.x;
  state.move.y = e.pageY - state.start.y;

  // 判断是否是往上滑还是往下滑
  const direction = getSwipeDirection(state.type, state.move);
  // 检测能否滑动
  const canSlideRes = canSlide(state);
  // TODO: 待判断第一个无法滑动问题
  if (canSlideRes) {
    // 判断是否可以继续滑动 如果用户传了，我就用他的，否则就用默认的。
    if (canNextCb) {
      if (canNextCb?.(state, direction)) {
        _stopPropagation(e);
        // 获取偏移量
        // getSlideOffset(state, e);
        const t =
          getSlideOffset(state, el) +
          (direction === SwiperDirectionEnum.Left ||
          direction === SwiperDirectionEnum.Up
            ? state.judgeValue
            : -state.judgeValue);
        // const t = 20;

        let dx1 = 0;
        let dx2 = 0;
        if (state.type === SlideEnum.HORIZONTAL) {
          dx1 = t + state.move.x;
        } else {
          dx2 = t + state.move.y;
        }

        _css(el, 'transition-duration', '0ms');
        _css(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`);
      }
    }
  }
}
/**
 * 判断滑动方向
 */
export function getSwipeDirection(
  type: SlideEnum,
  move: MouseEventState['move'],
) {
  if (type === SlideEnum.HORIZONTAL) {
    return move.x < 0 ? SwiperDirectionEnum.Left : SwiperDirectionEnum.Right;
  }
  return move.y < 0 ? SwiperDirectionEnum.Up : SwiperDirectionEnum.Down;
}
/**
 * 滑动结束
 */
export function slideTouchEnd(
  e: PointerEvent,
  state: MouseEventState,
  canNextCb: (state: MouseEventState, direction: SwiperDirectionEnum) => any,
  nextCb: (direction: SwiperDirectionEnum) => any,
) {
  if (!checkEvent(e)) {
    return;
  }
  if (!state.isDown) {
    return;
  }
  if (state.next) {
    // 判断他是否是水平方向
    const isHorizontal = state.type === SlideEnum.HORIZONTAL;
    // 滑动方向
    const direction = getSwipeDirection(state.type, state.move);
    if (canNextCb?.(state, direction)) {
      const endTime = Date.now();
      let gapTime = endTime - state.start.time;
      const distance = isHorizontal ? state.move.x : state.move.y;
      const judgeValue = isHorizontal
        ? state.wrapper.width
        : state.wrapper.height;
      // 1、距离太短，直接不通过
      if (Math.abs(distance) < 20) {
        gapTime = 1000;
      }
      // 2、距离太长，直接通过
      if (Math.abs(distance) > judgeValue / 3) {
        gapTime = 100;
      }
      // 3、若不在上述两种情况，那么只需要判断时间即可
      if (gapTime < 150) {
        if (
          direction === SwiperDirectionEnum.Left ||
          direction === SwiperDirectionEnum.Up
        ) {
          state.localIndex++;
        } else {
          state.localIndex--;
        }
        nextCb?.(direction);
      }
    }
  }
}
/**
 * 结束后重置变量
 */
export function slideReset(
  e: PointerEvent,
  el: HTMLDivElement,
  state: MouseEventState,
) {
  if (!checkEvent(e)) {
    return;
  }
  // 需要加过渡动画，让用户有一个流畅的体验
  _css(el, 'transition-duration', '300ms');
  const t = getSlideOffset(state, el);
  let dx1 = 0;
  let dx2 = 0;

  if (state.type === SlideEnum.HORIZONTAL) {
    dx1 = t;
  } else {
    dx2 = t;
  }
  _css(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`);
}
/**
 *
 * @param state
 * @param el
 * @returns 计算移动距离
 */
export function getSlideOffset(state: MouseEventState, el: HTMLDivElement) {
  // 判断如果是水平移动
  if (state.type === SlideEnum.HORIZONTAL) {
    return 0;
  }
  if (state.type === SlideEnum.VERTICAL_INFINITE) {
    return 0;
  }
  const heights: number[] = [];

  const childrens = Array.from(el?.children) || [];
  for (const child of childrens) {
    heights.push(child.getBoundingClientRect()?.height);
  }
  // Array.from(el?.children)?.forEach(v => {
  //   heights.push(v.getBoundingClientRect()?.height);
  // });
  const currentHeight = heights.slice(0, state.localIndex);

  if (currentHeight?.length) {
    return -currentHeight.reduce((pre, cur) => {
      return pre + cur;
    });
  }
  return 0;
}
export function canSlide(state: MouseEventState) {
  // 判断是否需要检测
  if (state.needCheck) {
    if (
      Math.abs(state.move.x) > state.judgeValue ||
      Math.abs(state.move.y) > state.judgeValue
    ) {
      // 根据长宽比判断方向
      const angle =
        (Math.abs(state.move.x) * 10) / (Math.abs(state.move.y) * 10);
      // 根据当前slide的类型，判断能否滑动，并记录下来，后续不再判断，直接返回记录值
      state.next = state.type === SlideEnum.HORIZONTAL ? angle > 1 : angle <= 1;
      state.needCheck = false;
    } else {
      return false;
    }
  }
  return state.next;
}
/**
 * @returns 能否继续滑动
 * @param isNext 判断从头到尾滑动还是从尾到头滑动
 */
export function canNext(isNext: boolean) {
  return !isNext;
}
