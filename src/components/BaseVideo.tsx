import { type FC, useRef, useEffect } from 'react';
import './BaseVideo.less';
import { useDeepCompareEffect, useSetState } from 'ahooks';
import { IconPlayArrowFill } from '@arco-design/web-react/icon';
import clsx from 'clsx';
import ItemToolbar from './ItemToolbar';
import ItemDesc from './ItemDesc';
import emitter, {
  EVENTKEYENUM,
  type SingleClickBroadcastParams,
} from '@/bus/eventBus';
import { type HeaderEnum, MediaEnum } from '@/common/contains';
import type { AwemeData } from '@/common/data';
import { _css } from '@/utils/dom';
import { _duration } from '@/utils';

interface BaseVideoProps {
  videoUrl: string;

  isplay: boolean;
  position?: {
    uniqueId: HeaderEnum;
    index: number;
  };
  item: AwemeData;
  isLive?: boolean;
}
const BaseVideo: FC<BaseVideoProps> = ({
  videoUrl,
  item,
  isplay,
  position,
  isLive = false,
}) => {
  const [state, setState] = useSetState({
    status: isplay ? MediaEnum.PLAY : MediaEnum.PAUSE,
    playX: 0,
    iscommentVisible: true,
    isMove: false,
  });

  const baseVideoRef = useRef({
    step: 0,
    progressBarRect: {
      height: 0,
      width: 0,
    },
    duration: 0,
    currentTime: 0,
    start: {
      x: 0,
    },
    last: {
      x: 0,
      time: 0,
    },
  });
  const videoEl = useRef<HTMLVideoElement>(null);
  const progressEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log('视频组件初始化...');
    console.log('state==', state.iscommentVisible);
    return () => {
      console.log('销毁');
    };
  }, [state.iscommentVisible]);
  const loadedMetadata = (e: any) => {
    // 获取播放进度
    const { target } = e ?? {};
    const { current } = baseVideoRef;
    current.duration = target.duration;
    current.progressBarRect = progressEl.current?.getBoundingClientRect() || {
      height: 0,
      width: 0,
    };
    // 获取步数
    current.step = current.progressBarRect.width / Math.floor(current.duration);
  };
  // 视频时间更新时会触发
  const timeupdate = (e: any) => {
    baseVideoRef.current.currentTime = Math.ceil(e.target.currentTime);

    setState({
      playX: (baseVideoRef.current.currentTime - 1) * baseVideoRef.current.step,
    });
  };
  console.log('state.playX==', state.playX);
  const play = () => {
    if (!videoEl.current) {
      console.error('播放器初始化失败,请刷新重试');
    }
    if (videoEl.current) {
      videoEl.current.volume = 1;
      setState({
        status: MediaEnum.PLAY,
      });
      // setStatus(MediaEnum.PLAY);
    }

    videoEl.current?.play();
  };
  const pause = () => {
    // setStatus(MediaEnum.PAUSE);
    setState({
      status: MediaEnum.PAUSE,
    });
    videoEl.current?.pause();
  };

  const click = ({ type, index, uniqueId }: SingleClickBroadcastParams) => {
    debugger;
    if (position?.index === index && position.uniqueId === uniqueId) {
      const { status } = state ?? {};
      if (type === EVENTKEYENUM.ITEM_TOGGLE) {
        // 判断是否为直播状态
        if (isLive) {
          pause();
          return;
        }
        if (status === MediaEnum.PLAY) {
          pause();
        } else {
          play();
        }
      }
      if (videoEl.current) {
        if (type === EVENTKEYENUM.ITEM_STOP) {
          videoEl.current.currentTime = 0;
          pause();
        }
        if (type === EVENTKEYENUM.ITEM_PLAY) {
          videoEl.current.currentTime = 0;
          play();
        }
      }
    }
  };

  /**
   * 要展示的菜单
   * @param id 展示菜单的 id
   */
  const onOpenComments = (id: string) => {
    console.log('video==', videoEl.current);
    if (id === item.aweme_id) {
      _css(videoEl.current, 'transition-duration', '300ms');
      _css(videoEl.current, 'height', 'calc(var(--vh, 1vh) * 30)');
    }
    // 关闭评论组件
    // baseVideoRef.current.commentVisible = false;
    setState({
      iscommentVisible: false,
    });
  };
  /**
   * 关闭 video 上拉
   */
  const onCloseComments = () => {
    // 如果是上拉状态，那么就关闭上拉状态
    if (state.iscommentVisible === false) {
      _css(videoEl.current, 'transition-duration', '300ms');
      _css(videoEl.current, 'height', '100%');
      setState({
        iscommentVisible: true,
      });
    }
  };
  // 弹窗关闭
  const onDialogEnd = ({ tag, isClose }: { tag: string; isClose: boolean }) => {
    if (!state.iscommentVisible && tag === 'comment') {
      _css(videoEl.current, 'transition-duration', '300ms');
      if (isClose) {
        setState({
          iscommentVisible: true,
        });
        _css(videoEl.current, 'height', '100%');
      } else {
        _css(videoEl.current, 'height', 'calc(var(--vh, 1vh) * 30)');
      }
    }
  };
  const onDialogMove = ({
    tag,
    distance,
  }: {
    tag: string;
    distance: number;
  }) => {
    if (!state.iscommentVisible && tag === 'comment') {
      _css(videoEl.current, 'transition-duration', '0ms');
      _css(
        videoEl.current,
        'height',
        `calc(var(--vh, 1vh) * 30 + ${distance}px)`,
      );
    }
  };
  // 进度条事件-- 开始滑动
  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // state.srat
    const { current } = baseVideoRef ?? {};
    current.start.x = e.touches[0].pageX;
    current.last.x = e.touches[0].pageX;
    current.last.time = current.currentTime;
  };
  // 滑动过程
  const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setState({
      isMove: true,
    });
    pause();
    // 算出滑动距离
    const dx = e.touches[0].pageX - baseVideoRef.current.start.x;
    // 同步进度条
    setState({
      playX: baseVideoRef.current.last.x + dx,
    });
    baseVideoRef.current.currentTime =
      baseVideoRef.current.last.time +
      Math.ceil(Math.ceil(dx) / baseVideoRef.current.step);
    if (baseVideoRef.current.currentTime <= 0) {
      baseVideoRef.current.currentTime = 0;
    }
    if (baseVideoRef.current.currentTime >= baseVideoRef.current.duration) {
      baseVideoRef.current.currentTime = baseVideoRef.current.duration;
    }
  };
  // 滑动结束
  const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (state.status === MediaEnum.PLAY) {
      return;
    }
    requestAnimationFrame(() => {
      setState({
        isMove: false,
      });
    });
    if (videoEl.current) {
      videoEl.current.currentTime = baseVideoRef.current.currentTime;
    }
    play();
  };
  useDeepCompareEffect(() => {
    emitter.on(EVENTKEYENUM.SINGLE_CLICK_BROADCAST, click);
    emitter.on(EVENTKEYENUM.OPEN_COMMENTS, onOpenComments);
    emitter.on(EVENTKEYENUM.CLOSE_COMMENTS, onCloseComments);
    emitter.on(EVENTKEYENUM.DIALOG_END, onDialogEnd);
    emitter.on(EVENTKEYENUM.DIALOG_MOVE, onDialogMove);
    return () => {
      emitter.off(EVENTKEYENUM.SINGLE_CLICK_BROADCAST, click);
      emitter.off(EVENTKEYENUM.OPEN_COMMENTS, onOpenComments);
      emitter.off(EVENTKEYENUM.CLOSE_COMMENTS, onCloseComments);
      emitter.off(EVENTKEYENUM.DIALOG_END, onDialogEnd);
      emitter.off(EVENTKEYENUM.DIALOG_MOVE, onDialogMove);
    };
  }, [state]);
  // useEffect

  return (
    <div className="video-wrapper">
      <video
        preload="true"
        autoPlay={isplay}
        muted
        ref={videoEl}
        src={videoUrl}
        onLoadedMetadata={loadedMetadata}
        onTimeUpdate={timeupdate}
        loop
      />

      {!(state.status === MediaEnum.PLAY) && (
        <IconPlayArrowFill className="pause-icon" />
      )}
      <div className="float">
        {isLive ? (
          <>
            <div className="living">点击进入直播间</div>
            <ItemDesc isLive={isLive} data={item} />
          </>
        ) : (
          <div className="normal">
            {state.iscommentVisible && (
              <>
                <ItemToolbar data={item} />
                <ItemDesc isLive={isLive} data={item} />
              </>
            )}
          </div>
        )}

        {/* 进度条 */}
        <div
          className={clsx('progress', {
            move: state.isMove,
            stop: state.status === MediaEnum.STOP,
          })}
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
          ref={progressEl}
        >
          {/* 如果是拉动进度条状态才展示时间 */}
          {state.isMove && (
            <div className="time">
              <span className="currentTime">
                {_duration(baseVideoRef.current.currentTime)}
              </span>
              <span className="duration">
                /{_duration(baseVideoRef.current.duration)}
              </span>
            </div>
          )}
          {/* 如果是大于 15 秒或者是暂停状态才展示进度条 */}
          {(baseVideoRef.current.duration > 15 ||
            state.status === MediaEnum.PAUSE) && (
            <>
              <div className="bg" />

              <div
                className="progress-line"
                style={{ width: `${state.playX}px` }}
              />
              <div className="point" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default BaseVideo;
