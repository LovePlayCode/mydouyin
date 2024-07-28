import { FC, useRef } from 'react';
import clsx from 'clsx';
import { useMount } from 'ahooks';
import { MouseEventState } from './SlideVerticalInfinite';
import { SlideEnum, SwiperDirectionEnum } from '@/common/contains';
import {
  sildeTouchStart,
  slideInit,
  slideReset,
  slideTouchEnd,
  slideTouchMove,
} from '@/utils/slide';

interface SlideHorizontalProps {
  children: React.ReactNode;
  className?: string;
  name?: string;
  index: number;
}
const SlideHorizontal: FC<SlideHorizontalProps> = ({
  children,
  className,
  index,
}) => {
  // 关于事件的一些变量
  const state = useRef<MouseEventState>({
    isDbClick: false,
    clickTimer: 0,
    dbClickTimer: -1,
    lastClickTime: 0,
    isDown: false,
    isMove: false,
    checkTime: 200,

    dbCheckCancelTime: 500,
    // 记录滑动时间等
    start: {
      x: 0,
      y: 0,
      time: 0,
    },
    wrapper: {
      width: 390,
      height: 788,
      childrenLength: 0,
    },
    move: { x: 0, y: 0 },
    needCheck: true,
    judgeValue: 20,
    next: false,
    type: SlideEnum.HORIZONTAL,
    localIndex: index || 0,
  });
  const slideListEl = useRef<HTMLDivElement>(null);
  const pointerDown = (e: React.PointerEvent) => {
    if (slideListEl.current) {
      sildeTouchStart(e.nativeEvent, slideListEl.current, state.current);
    }
  };
  // 判断是否可以下一个  isNext 代表从头到尾或者从尾到头
  const canNext = (state: MouseEventState, direction: SwiperDirectionEnum) => {
    // 如果是第一个并且是往上滑，不允许滑动
    return !(
      (state.localIndex === 0 && direction === SwiperDirectionEnum.Right) ||
      (state.localIndex === state?.wrapper.childrenLength - 1 &&
        direction === SwiperDirectionEnum.Left)
    );
  };
  const pointerMove = (e: React.PointerEvent) => {
    slideListEl.current &&
      slideTouchMove(
        e.nativeEvent,
        slideListEl.current,
        state.current,
        canNext,
      );
  };
  const pointerUp = (e: React.PointerEvent) => {
    slideListEl.current &&
      slideTouchEnd(e.nativeEvent, state.current, canNext, direction => {
        if (
          direction === SwiperDirectionEnum.Left ||
          direction === SwiperDirectionEnum.Up
        ) {
          state.current.localIndex++;
        } else {
          state.current.localIndex--;
        }
      });

    // 重置
    slideReset(
      e?.nativeEvent,
      slideListEl.current as HTMLDivElement,
      state.current,
    );
    // 重置对应变量
    state.current.start.x = 0;
    state.current.start.y = 0;
    state.current.start.time = 0;
    state.current.move.x = 0;
    state.current.move.y = 0;
    state.current.next = false;
    state.current.needCheck = true;
    state.current.isDown = false;
  };
  useMount(() => {
    // 初始化一些高度变量
    if (slideListEl.current) {
      const { width, height, length } = slideInit(
        slideListEl.current,
        state.current,
      );
      state.current.wrapper = {
        height,
        width,
        childrenLength: length || 0,
      };
    }
  });
  return (
    <div className={clsx('slide', 'horizontal', className)}>
      <div
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        ref={slideListEl}
        className="slide-list"
      >
        {children}
      </div>
    </div>
  );
};
export default SlideHorizontal;
