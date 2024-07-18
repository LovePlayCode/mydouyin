import type { PointerEventHandler } from 'react';
import { _css } from './dom';
import { SlideEnum } from '@/common/contains';
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
  debugger;
  e.stopImmediatePropagation();
  e.stopPropagation();
  e.preventDefault();
}
export function slideTouchMove(
  e: any,
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
  const isNext =
    state.type === SlideEnum.HORIZONTAL ? state.move.x < 0 : state.move.y < 0;
  console.log('isNext==', isNext);
  // 检测能否滑动
  const canSlideRes = canSlide(state);
  // TODO: 待判断第一个无法滑动问题
  if (canSlideRes) {
    // 判断是否可以继续滑动 如果用户传了，我就用他的，否则就用默认的。
    if (canNextCb) {
      if (canNextCb?.(state, isNext)) {
        _stopPropagation(e);
        // 获取偏移量
        // getSlideOffset(state, e);
        const t =
          getSlideOffset(state, el) +
          (isNext ? state.judgeValue : -state.judgeValue);
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
 * 滑动结束
 */
export function slideTouchEnd(
  e: PointerEventHandler<HTMLDivElement>,
  state: MouseEventState,
  canNextCb,
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
    const isNext = isHorizontal ? state.move.x < 0 : state.move.y < 0;
    if (canNextCb?.(state, isNext)) {
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
        if (isNext) {
          state.localIndex++;
        } else {
          state.localIndex--;
        }
        return nextCb?.(isNext);
      }
    }
  }
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
    return -heights.reduce((pre, cur) => {
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
      // console.log('angle', angle, state.next)
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
