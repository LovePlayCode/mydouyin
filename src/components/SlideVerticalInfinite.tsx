import { useRef, type FC } from 'react';
import { useMount, useUnmount } from 'ahooks';
import SlideItem from './SlideItem';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';
import {
  sildeTouchStart,
  slideReset,
  slideTouchEnd,
  slideTouchMove,
} from '@/utils/slide';
import { SlideEnum, SwiperDirectionEnum } from '@/common/contains';
import { random } from '@/utils';
import loved from '@/components/img/loved.svg';
import Dom from '@/utils/dom';

interface SlideVerticalInfiniteProps {
  render: (
    item: any,
    isPlay: boolean,
    position: {
      uniqueId: string;
      index: number;
    },
  ) => React.ReactNode;
  list: any[];
  index?: number;
  virtualTotal?: number;
}
export interface MouseEventState {
  isDbClick: boolean;
  clickTimer: number;
  dbClickTimer: number;
  lastClickTime: number;

  isDown: boolean;
  isMove: boolean;
  checkTime: number;
  dbCheckCancelTime: number;
  start: {
    x: number;
    y: number;
    time: number;
  };
  move: {
    x: number;
    y: number;
  };
  wrapper: {
    width: number;
    height: number;
    childrenLength: number;
  };
  needCheck: boolean;
  judgeValue: number;
  next: boolean;
  type: SlideEnum;
  localIndex: number;
}
const SlideVerticalInfinite: FC<SlideVerticalInfiniteProps> = ({
  render,
  list,
  index,
  virtualTotal = 5,
}) => {
  // 父元素 dom 实例
  const verticalRef = useRef<HTMLDivElement>(null);
  // 关于事件的一些变量
  const eventRelated = useRef<MouseEventState>({
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
    type: SlideEnum.VERTICAL,
    localIndex: index || 0,
  });
  const click = () => {
    emitter.emit(EVENTKEYENUM.SINGLE_CLICK_BROADCAST, {
      type: EVENTKEYENUM.ITEM_TOGGLE,
      index: eventRelated.current.localIndex,
    });
  };
  useMount(() => {
    emitter.on(EVENTKEYENUM.SINGLE_CLICK, click);
  });
  useUnmount(() => {
    emitter.off(EVENTKEYENUM.SINGLE_CLICK, click);
  });
  // 拖动的元素
  const dropEl = useRef<HTMLDivElement>(null);
  // 双击事件
  const dbClick = (e: PointerEvent) => {
    console.log('触发...');
    const id = `a${Date.now()}`;
    const elWidth = 80;
    const rotate = random(0, 1);
    const template = `<img class="${
      rotate ? 'left love-dbclick' : 'right love-dbclick'
    }" id="${id}" src="${loved}">`;
    const el = new Dom().create(template);
    el.css({ top: e.y - elWidth - 40, left: e.x - elWidth / 2 });
    new Dom(verticalRef.current).append(el);
    setTimeout(() => {
      new Dom(`#${id}`).remove();
    }, 1000);
  };
  const check = (e: PointerEvent) => {
    const { current } = eventRelated;

    // 如果是双击
    if (eventRelated.current.isDbClick) {
      clearTimeout(eventRelated.current.dbClickTimer);
      // 调用双击事件
      dbClick(e);
      eventRelated.current.dbClickTimer = window.setTimeout(() => {
        eventRelated.current.isDbClick = false;
      }, eventRelated.current.dbCheckCancelTime);
    }
    // 获取当前时间
    const nowTiem = new Date().getTime();
    // 判断是单击还是双击
    if (nowTiem - current.lastClickTime < current.checkTime) {
      clearTimeout(current.clickTimer);
      dbClick(e);
      current.isDbClick = true;
      current.dbClickTimer = window.setTimeout(() => {
        current.isDbClick = false;
      }, current.dbCheckCancelTime);
    } else {
      current.clickTimer = window.setTimeout(() => {
        emitter.emit(EVENTKEYENUM.SINGLE_CLICK, 'home');
      }, current.checkTime);
    }
    current.lastClickTime = nowTiem;
  };
  const pointerDown = () => {
    eventRelated.current.isDown = true;
    console.log('eventRelatedDown==', eventRelated.current.isDown);
  };
  const pointerMove = () => {
    eventRelated.current.isDown && (eventRelated.current.isMove = true);
  };
  const up = (e: React.PointerEvent<HTMLDivElement>) => {
    console.log('eventRelatedUp==', eventRelated.current.isDown);
    if (!eventRelated.current.isDown) {
      return;
    }
    if (!eventRelated.current.isMove) {
      check(e.nativeEvent);
    }
    eventRelated.current.isMove = false;
    eventRelated.current.isDown = false;
  };

  // 开始滑动
  const pointStart = (e: any) => {
    console.log('eventRelatedPointStart==', eventRelated.current.isDown);
    sildeTouchStart(e?.nativeEvent, dropEl?.current!, eventRelated.current);
  };
  // 滑动过程
  const pointMove = (e: any) => {
    console.log('eventRelatedPointMove==', eventRelated.current.isDown);
    slideTouchMove(
      e?.nativeEvent,
      dropEl?.current as HTMLDivElement,
      eventRelated.current,
      canNext,
    );
  };
  // 判断是否可以下一个  isNext 代表从头到尾或者从尾到头
  const canNext = (state: MouseEventState, direction: SwiperDirectionEnum) => {
    // 如果是第一个并且是往上滑，不允许滑动
    return !(
      (state.localIndex === 0 && direction === SwiperDirectionEnum.Down) ||
      (eventRelated.current.localIndex === list?.length - 1 &&
        direction === SwiperDirectionEnum.Up)
    );
  };
  const pointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    console.log('eventRelatedPointPointerUp==', eventRelated.current.isDown);
    const isNext = eventRelated.current.move.y < 0;
    if (eventRelated.current.localIndex === 0 && !isNext) {
      return;
    }
    slideTouchEnd(e?.nativeEvent, eventRelated.current, canNext, () => {
      // 算出一半的距离
      const half = (virtualTotal - 1) / 2;
      // 如果当前长度大于一半的长度
      if (list.length > virtualTotal) {
        console.log('123');
      } else {
        console.log('没大于');
      }
    });

    // 重置
    slideReset(
      e?.nativeEvent,
      dropEl.current as HTMLDivElement,
      eventRelated.current,
    );
    // 重置对应变量
    eventRelated.current.start.x = 0;
    eventRelated.current.start.y = 0;
    eventRelated.current.start.time = 0;
    eventRelated.current.move.x = 0;
    eventRelated.current.move.y = 0;
    eventRelated.current.next = false;
    eventRelated.current.needCheck = true;
    eventRelated.current.isDown = false;
  };

  return (
    <>
      <div
        onPointerDown={pointerDown}
        onPointerMove={pointMove}
        onPointerUp={up}
        className="slide slide-infinite"
        ref={verticalRef}
      >
        <div
          onPointerDown={pointStart}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          ref={dropEl}
          className="slide-list flex-direction-column"
        >
          {list.map((item, index) => {
            return (
              <SlideItem key={index}>
                {render(item, index === eventRelated.current.localIndex, {
                  uniqueId: 'home',
                  index,
                })}
              </SlideItem>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default SlideVerticalInfinite;
