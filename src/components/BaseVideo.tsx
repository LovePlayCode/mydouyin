import { type FC, useRef, useEffect } from 'react';
import './BaseVideo.less';
import { useDeepCompareEffect, useSetState } from 'ahooks';
import { IconPlayArrowFill } from '@arco-design/web-react/icon';
import ItemToolbar from './ItemToolbar';
import ItemDesc from './ItemDesc';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';
import { MediaEnum } from '@/common/contains';
import type { AwemeData } from '@/common/data';
import { _css } from '@/utils/dom';

interface BaseVideoProps {
  videoUrl: string;

  isplay: boolean;
  position?: {
    uniqueId: string;
    index: number;
  };
  item: AwemeData;
}
const BaseVideo: FC<BaseVideoProps> = ({
  videoUrl,
  item,
  isplay,
  position,
}) => {
  const [state, setState] = useSetState({
    status: isplay ? MediaEnum.PLAY : MediaEnum.PAUSE,
    playX: 0,
    iscommentVisible: true,
  });

  const baseVideoRef = useRef({
    step: 0,
    progressBarRect: {
      height: 0,
      width: 0,
    },
    duration: 0,
    currentTime: 0,
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

  const click = ({ type, index }: { type: EVENTKEYENUM; index: number }) => {
    if (position?.index === index) {
      const { status } = state ?? {};
      if (type === EVENTKEYENUM.ITEM_TOGGLE) {
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
  useDeepCompareEffect(() => {
    emitter.on(EVENTKEYENUM.SINGLE_CLICK_BROADCAST, click);
    emitter.on(EVENTKEYENUM.OPEN_COMMENTS, onOpenComments);
    emitter.on(EVENTKEYENUM.CLOSE_COMMENTS, onCloseComments);
    return () => {
      emitter.off(EVENTKEYENUM.SINGLE_CLICK_BROADCAST, click);
      emitter.off(EVENTKEYENUM.OPEN_COMMENTS, onOpenComments);
      emitter.off(EVENTKEYENUM.CLOSE_COMMENTS, onCloseComments);
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
        <div className="normal">
          {state.iscommentVisible && (
            <>
              <ItemToolbar data={item} />
              <ItemDesc data={item} />
            </>
          )}
        </div>
        {/* 进度条 */}
        <div className="progress" ref={progressEl}>
          {baseVideoRef.current.duration > 15 && (
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
