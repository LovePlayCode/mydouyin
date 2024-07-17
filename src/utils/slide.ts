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
) {
  if (!checkEvent(e)) {
    return;
  }
  if (!state.isDown) {
    return;
  }
  state.move.x = e.pageX - state.start.x;
  state.move.y = e.pageY - state.start.y;
  // 检测能否滑动
  const canSlideRes = canSlide(state);
  // TODO: 待判断第一个无法滑动问题
  if (canSlideRes) {
    _stopPropagation(e);
    // 获取偏移量
    // getSlideOffset(state, e);
    const t = 20;
    const dx1 = 0;
    let dx2 = 0;
    dx2 = t + state.move.y;
    _css(el, 'transition-duration', '0ms');
    _css(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`);
  }
}
export function getSlideOffset(state: MouseEventState, el: HTMLDivElement) {
  return state.wrapper.height;
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
