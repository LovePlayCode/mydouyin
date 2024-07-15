import { useRef, type FC } from 'react';
import SlideItem from './SlideItem';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';

interface SlideVerticalInfiniteProps {
  render: (item: any) => React.ReactNode;
  list: any[];
}
const SlideVerticalInfinite: FC<SlideVerticalInfiniteProps> = ({
  render,
  list,
}) => {
  const eventRelated = useRef({
    isDbClick: false,
    clickTimer: 0,
    dbClickTimer: -1,
    lastClickTime: 0,
    isDown: false,
    isMove: false,
    checkTime: 200,
    dbCheckCancelTime: 500,
  });

  // 双击事件
  const dbClick = (e: React.PointerEvent<HTMLDivElement>) => {};
  const check = (e: React.PointerEvent<HTMLDivElement>) => {
    const { current } = eventRelated;
    debugger;
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
  };
  const pointerMove = () => {
    eventRelated.current.isDown && (eventRelated.current.isMove = true);
  };
  const up = (e: React.PointerEvent<HTMLDivElement>) => {
    console.log('eventRelated==', eventRelated);
    if (!eventRelated.current.isDown) {
      return;
    }
    if (!eventRelated.current.isMove) {
      check(e);
    }
    eventRelated.current.isMove = false;
    eventRelated.current.isDown = false;
  };
  return (
    <>
      <div
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={up}
        className="slide slide-infinite"
      >
        <div className="slide-list flex-direction-column">
          {list.map(item => {
            return <SlideItem key={item}>{render(item)}</SlideItem>;
          })}
        </div>
      </div>
    </>
  );
};
export default SlideVerticalInfinite;
