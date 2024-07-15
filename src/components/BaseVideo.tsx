import { type FC, useEffect, useRef, useState } from 'react';
import './BaseVideo.less';
import { useMount, useSetState } from 'ahooks';
import { IconPlayArrowFill } from '@arco-design/web-react/icon';
import ItemToolbar from './ItemToolbar';
import ItemDesc from './ItemDesc';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';
import { MediaEnum } from '@/common/contains';

interface BaseVideoProps {
  videoUrl: string;
  avatarUrl: string;
  isplay: boolean;
}
const BaseVideo: FC<BaseVideoProps> = ({ videoUrl, avatarUrl, isplay }) => {
  const [state, setState] = useSetState({
    status: isplay ? MediaEnum.PLAY : MediaEnum.PAUSE,
    playX: 0,
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
    console.log(
      'baseVideoRef==',
      (baseVideoRef.current.currentTime - 1) * baseVideoRef.current.step,
    );
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

  const click = ({ type }: { type: EVENTKEYENUM }) => {
    const { status } = state ?? {};
    if (type === EVENTKEYENUM.ITEM_TOGGLE) {
      if (status === MediaEnum.PLAY) {
        pause();
      } else {
        play();
      }
    }
  };
  emitter.on(EVENTKEYENUM.SINGLE_CLICK_BROADCAST, click);

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
          <ItemToolbar avatarUrl={avatarUrl} />
          <ItemDesc />
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
