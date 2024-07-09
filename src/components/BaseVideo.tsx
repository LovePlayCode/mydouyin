import { FC } from 'react';
import './BaseVideo.less';

interface BaseVideoProps {
  videoUrl: string;
}
const BaseVideo: FC<BaseVideoProps> = ({ videoUrl }) => {
  return (
    <div className="video-wrapper">
      <video preload="true" autoPlay controls src={videoUrl}></video>
    </div>
  );
};
export default BaseVideo;
