import { FC, useRef } from 'react';
import './BaseVideo.less';
import { useMount } from 'ahooks';
import { IconPlayArrowFill } from '@arco-design/web-react/icon';
import ItemToolbar from './ItemToolbar';
import ItemDesc from './ItemDesc';

interface BaseVideoProps {
  videoUrl: string;
  avatarUrl: string;
}
const BaseVideo: FC<BaseVideoProps> = ({ videoUrl, avatarUrl }) => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const play = () => {
    if (!videoEl.current) {
      console.error('播放器初始化失败,请刷新重试');
    }
    if (videoEl.current) {
      videoEl.current.volume = 1;
    }

    videoEl.current?.play();
  };
  useMount(() => {
    // if (videoEl.current) {
    //   videoEl.current.currentTime = 0;
    // }
  });
  return (
    <div className="video-wrapper">
      <video preload="true" autoPlay ref={videoEl} src={videoUrl} />
      <IconPlayArrowFill className="pause-icon" />
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
