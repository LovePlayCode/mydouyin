import { type FC, useEffect, useRef, useState } from 'react';
import './BaseVideo.less';
import { useMount } from 'ahooks';
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
  const [status, setStatus] = useState(
    isplay ? MediaEnum.PLAY : MediaEnum.PAUSE,
  );

  const videoEl = useRef<HTMLVideoElement>(null);
  const play = () => {
    if (!videoEl.current) {
      console.error('播放器初始化失败,请刷新重试');
    }
    if (videoEl.current) {
      videoEl.current.volume = 1;
      setStatus(MediaEnum.PLAY);
    }

    videoEl.current?.play();
  };
  const pause = () => {
    setStatus(MediaEnum.PAUSE);
    videoEl.current?.pause();
  };
  useEffect(() => {
    console.log('播放器状态==', status);
  }, [status]);
  const click = ({ type }: { type: EVENTKEYENUM }) => {
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
        loop
      />
      {!(status === MediaEnum.PLAY) && (
        <IconPlayArrowFill className="pause-icon" />
      )}
      <div className="float">
        <div className="normal">
          <ItemToolbar avatarUrl={avatarUrl} />
          <ItemDesc />
        </div>
      </div>
    </div>
  );
};
export default BaseVideo;
