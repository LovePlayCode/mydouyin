import { FC } from 'react';
import './BaseVideo.less';
import { IconPlayArrowFill } from '@arco-design/web-react/icon';
import ItemToolbar from './ItemToolbar';

interface BaseVideoProps {
  videoUrl: string;
  avatarUrl: string;
}
const BaseVideo: FC<BaseVideoProps> = ({ videoUrl, avatarUrl }) => {
  return (
    <div className="video-wrapper">
      <video preload="true" autoPlay controls src={videoUrl}></video>
      <IconPlayArrowFill className="pause-icon" />
      <div className="float">
        <div className="normal">
          <ItemToolbar avatarUrl={avatarUrl} />
        </div>
      </div>
    </div>
  );
};
export default BaseVideo;
