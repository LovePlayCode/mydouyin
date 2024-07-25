import clsx from 'clsx';

import { type FC, useRef } from 'react';
import { useControllableValue, useUpdateEffect } from 'ahooks';
import './FromBottomDialog.less';
import { CSSTransition } from 'react-transition-group';
import Dom, { _css } from '@/utils/dom';
import { _stopPropagation } from '@/utils/slide';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';

interface FromBottomDialogProps {
  mode: 'dark' | 'light' | 'white';
  pageId: string;
  modelValue: boolean;
  showHengGang: boolean;
  children: React.ReactNode;
  header?: React.ReactNode;
  maskMode: string;
  height: string | number;
  setModelValue: (val: boolean) => void;
  /** 弹窗关闭的回调 */
  hide?: (params: any) => any;
  // tag 名称
  tag?: string;
}
const FromBottomDialog: FC<FromBottomDialogProps> = ({
  mode = 'dark',
  showHengGang = false,
  children,
  header,
  pageId,
  maskMode,
  height = 'calc(var(--vh, 1vh) * 70)',
  hide,
  tag,
  ...props
}) => {
  const scroll = useRef(0);
  // 记录开始滑动的 Y 轴距离
  const startY = useRef<number>(0);
  // 记录移动的距离
  const moveY = useRef<number>(0);
  // 记录当前的事件
  const startTime = useRef<number>(0);
  // dialogEl元素
  const dialogEl = useRef<HTMLDivElement>(null);
  const pagePosition = useRef(null);
  const [modelValue, setModelValue] = useControllableValue<boolean>(props, {
    defaultValue: false,
    defaultValuePropName: 'defaultModelValue',
    valuePropName: 'modelValue',
    trigger: 'setModelValue',
  });
  const onHide = (val = false) => {
    setModelValue(val);
    // 调用外部hide
    hide?.(val);
  };

  const wrapperEl = useRef<HTMLDivElement>(null);

  useUpdateEffect(() => {
    // 获取 page  id
    const pageEl = document.getElementById(pageId);

    if (!pageEl) {
      return;
    }
    if (modelValue) {
      pageEl.style.position = 'absolute';
      pagePosition.current = _css(pageEl, 'position');
      scroll.current = document.documentElement.scrollTop;
      document.body.style.position = 'fixed';
      document.body.style.top = `${-scroll.current}px`;
      const maskTemplate = `<div class="Mask fade-in ${maskMode}"></div>`;
      const mask = new Dom().create(maskTemplate);
      setTimeout(() => {
        mask.on('click', (e: Event) => {
          console.log('e==', e);
          _stopPropagation(e);
          onHide(false);
        });
      }, 200);
      pageEl.appendChild(mask.els[0]);
    } else {
      pageEl.style.position = pagePosition.current || 'fixed';
      document.body.style.position = 'static';
      document.documentElement.scrollTop = scroll.current;

      const mask = new Dom('.Mask').replaceClass('fade-in', 'fade-out');
      setTimeout(() => {
        mask.remove();
      }, 250);
    }
  }, [modelValue]);
  const onStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // 如果用户滑动评论了，不可以让他滑动评论组件
    if (wrapperEl.current?.scrollTop !== 0) {
      return;
    }
    startY.current = e.touches?.[0].clientY;
    // 记录事件开始的时间
    startTime.current = Date.now();
    _css(dialogEl.current, 'transition-duration', '0ms');
  };
  const onMove = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log('onMove==', wrapperEl.current?.scrollTop);
    if (wrapperEl.current?.scrollTop !== 0) {
      return;
    }

    moveY.current = e.touches[0].pageY - startY.current;
    // debugger;
    // console.log('moveY.current==', moveY.current, e.touches[0].pageX);
    if (moveY.current > 0) {
      emitter.emit(EVENTKEYENUM.DIALOG_MOVE, {
        tag: tag || '',
        distance: moveY.current,
      });
      _css(
        dialogEl.current,
        'transform',
        `translate3d(0, ${moveY.current}px, 0)`,
      );
    }
  };
  // 触摸事件结束
  const onEnd = () => {
    if (!dialogEl.current) {
      return;
    }
    if (Date.now() - startTime.current < 150 && Math.abs(moveY.current) < 30) {
      return;
    }
    // 获取元素内置属性
    const clientHeight = dialogEl.current?.clientHeight;
    _css(dialogEl.current, 'transition-duration', '250ms');
    // 如果一次性移动的距离超过了元素本身距离的一半 否则恢复原状
    if (Math.abs(moveY.current) > clientHeight / 2) {
      emitter.emit(EVENTKEYENUM.DIALOG_END, {
        tag: tag || '',
        isClose: true,
      });
      _css(dialogEl.current, 'transform', 'translate3d(0,100%,0)');
      requestAnimationFrame(() => {
        onHide?.();
      });
    } else {
      emitter.emit(EVENTKEYENUM.DIALOG_END, {
        tag: tag || '',
        isClose: false,
      });
      _css(dialogEl.current, 'transform', 'translate3d(0,0,0)');
    }
  };
  const nodeRef = useRef(null);
  console.log('modelvalue==', modelValue);
  return (
    <CSSTransition
      in={modelValue}
      timeout={250}
      unmountOnExit
      classNames="test"
    >
      <div
        className={clsx('FromBottomDialog', mode, {
          'no-heng-gang': !showHengGang,
        })}
        style={{ height, maxHeight: height }}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
        ref={dialogEl}
      >
        {header && header}
        {showHengGang && (
          <div className={clsx('heng-gang', mode)}>
            <div className="content" />
          </div>
        )}

        <div ref={wrapperEl} className="wrapper">
          {children}
        </div>
      </div>
    </CSSTransition>
  );
  return modelValue ? (
    <>
      <CSSTransition in={modelValue} timeout={250} classNames="my-node">
        <div
          className={clsx('FromBottomDialog', mode, {
            'no-heng-gang': !showHengGang,
          })}
          style={{ height, maxHeight: height }}
          onTouchStart={onStart}
          onTouchMove={onMove}
          onTouchEnd={onEnd}
          ref={dialogEl}
        >
          {header && header}
          {showHengGang && (
            <div className={clsx('heng-gang', mode)}>
              <div className="content" />
            </div>
          )}

          <div ref={wrapperEl} className="wrapper">
            {children}
          </div>
        </div>
      </CSSTransition>
    </>
  ) : (
    <></>
  );
};
export default FromBottomDialog;
