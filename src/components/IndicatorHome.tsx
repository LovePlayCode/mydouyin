import { IconAlignLeft, IconSearch } from '@arco-design/web-react/icon';
import clsx from 'clsx';
import { FC, useRef } from 'react';
import { useMount, useReactive } from 'ahooks';
import { _css } from '@/utils/dom';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';

interface IndicatorHomeProps {
  index: number;
  name: string;
}
const IndicatorHome: FC<IndicatorHomeProps> = ({ index, name }) => {
  const state = useReactive<{
    lefts: number[];
    indicatorSpace: number;
    moveY: number;
  }>({
    lefts: [],
    indicatorSpace: 0,
    moveY: 0,
  });
  // 下方指示条
  const indicatorRef = useRef<HTMLDivElement>(null);
  // tab 实例
  const tabs = useRef<HTMLDivElement>(null);
  const initTabs = () => {
    debugger;
    // 获得tab 宽度的总宽度
    const indicatorWidth = _css(indicatorRef.current, 'width');
    const childrens = Array.from(tabs.current?.children || []);
    for (const item of childrens) {
      const tabWidth = _css(item, 'width');
      if (tabs.current) {
        // 获取每个 tab 之间的位置
        state.lefts.push(
          item.getBoundingClientRect().x -
            tabs.current?.children[0]?.getBoundingClientRect()?.x +
            (tabWidth * 0.5 - indicatorWidth / 2) || 0,
        );
      }
      state.indicatorSpace = state.lefts[1] - state.lefts[0];
      _css(indicatorRef.current, 'transition-duration', `300ms`);
      _css(indicatorRef.current, 'left', `${state.lefts[index]}px`);
      console.log('state=-=', state);
    }
  };
  const move = (e: number) => {
    debugger;
    _css(indicatorRef.current, 'transition-duration', `0ms`);
    _css(
      indicatorRef.current,
      'left',
      `${
        state.lefts[index] -
        e / (document.body.clientHeight / state.indicatorSpace)
      }px`,
    );
  };
  const end = (index: number) => {
    // 将moveY设置为 0
    state.moveY = 0;
    _css(indicatorRef.current, 'transition-duration', `300ms`);
    _css(indicatorRef.current, 'left', `${state.lefts[index]}px`);
    setTimeout(() => {
      _css(indicatorRef.current, 'transition-duration', `0ms`);
    }, 300);
  };
  useMount(() => {
    initTabs();
    if (name === 'SECOND') {
      emitter.on(EVENTKEYENUM.SECOND_MOVEX, move);
      emitter.on(EVENTKEYENUM.SECOND_MOVEY, y => {
        state.moveY = y;
      });
      emitter.on(EVENTKEYENUM.SECOND_END, end);
    }
    return () => {
      if (name === 'SECOND') {
        emitter.off(EVENTKEYENUM.SECOND_MOVEX, move);
        emitter.off(EVENTKEYENUM.SECOND_MOVEY, y => {
          state.moveY = y;
        });
        emitter.off(EVENTKEYENUM.SECOND_END, end);
      }
    };
  });

  return (
    <div className="indicator-home">
      <div className="notice">
        <span>下拉刷新内容</span>
      </div>
      <div className="toolbar">
        <div
          style={{
            width: '24rem',
            height: '24rem',
            fontSize: '24rem',
          }}
        >
          <IconAlignLeft style={{ fontSize: '24rem' }} />
        </div>
        <div className="tab-ctn">
          <div className="tabs" ref={tabs}>
            <div
              className={clsx('tab', {
                active: index === 0,
              })}
            >
              <span>热点</span>
            </div>
            {/* <div className="tab">
              <span>长视频</span>
            </div> */}
            <div
              className={clsx('tab', {
                active: index === 1,
              })}
            >
              <span>关注</span>
            </div>
            {/* <div className="tab">
              <span>经验</span>
            </div>
            <div className="tab">
              <span>推荐</span>
            </div> */}
          </div>
          <div className="indicator" ref={indicatorRef} />
        </div>
        {/* 搜索图标展示区域 */}
        <div style={{ width: '24rem', height: '24rem' }} className="searchIcon">
          <IconSearch />
        </div>
      </div>
    </div>
  );
};
export default IndicatorHome;
