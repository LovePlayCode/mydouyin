import type { FC } from 'react';
import clsx from 'clsx';
import styles from './ItemToolbar.module.less';
import love from './img/love.svg';
import loved from './img/loved.svg';
import shareWhiteFull from './img/share-white-full.png';
import addLight from './img/add-light.png';
import okRed from './img/ok-red.png';
import BaseMusic from './BaseMusic';
import type { AwemeData } from '@/common/data';
import { _formatNumber } from '@/utils';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';

interface ItemToolbarProps {
  data: AwemeData;
}
const ItemToolbar: FC<ItemToolbarProps> = ({ data }) => {
  const showComments = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 阻止默认事件
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    emitter.emit(EVENTKEYENUM.OPEN_COMMENTS, data.aweme_id);
  };
  return (
    <div
      onPointerDown={e => {
        e.stopPropagation();
      }}
      className={clsx(styles.toolbar, 'mb1r')}
    >
      {/* 头像部分 */}
      <div className="avatar-ctn mb2r">
        <img
          src={data?.author.avatar_168x168.url_list[0]}
          alt=""
          className="avatar"
        />
        {/* 关注区域 */}
        <div className="options">
          <img className="no" src={addLight} alt="" />
          <img className="yes" src={okRed} alt="" />
        </div>
      </div>
      {/* 点赞部分 */}
      <div className="love mb2r">
        <div>
          {data?.isLoved ? (
            <img src={loved} className="love-image" alt="" />
          ) : (
            <img src={love} className="love-image" alt="" />
          )}
          {/* <img src={loved} className="love-image" alt="" /> */}
        </div>
        <span>{_formatNumber(data.statistics.digg_count)}</span>
      </div>
      {/* 消息部分 */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div className="message mb2r" onClick={showComments}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          className="icon iconify iconify--mage"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          style={{ color: 'white' }}
        >
          <path
            fill="currentColor"
            d="M21.25 8.18a9.78 9.78 0 0 0-2.16-3.25a10 10 0 0 0-14.15 0a9.76 9.76 0 0 0-2.17 3.25A10 10 0 0 0 2.01 12a9.74 9.74 0 0 0 .74 3.77l-.5 3.65a1.95 1.95 0 0 0 1.29 2.26c.297.098.613.122.92.07l3.65-.54a9.758 9.758 0 0 0 3.88.79a10 10 0 0 0 9.24-13.82zM7.73 13.61a1.61 1.61 0 1 1 .001-3.22a1.61 1.61 0 0 1 0 3.22m4.28 0a1.61 1.61 0 1 1 .001-3.22a1.61 1.61 0 0 1 0 3.22m4.28 0a1.61 1.61 0 1 1 .001-3.22a1.61 1.61 0 0 1 0 3.22"
          />
        </svg>
        <span>{_formatNumber(data.statistics.comment_count)}</span>
      </div>
      {/* 收藏部分 */}
      <div className="message mb2r">
        <svg
          data-v-865b7541=""
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          className="icon iconify iconify--ic"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          style={{ color: 'white' }}
        >
          <path
            fill="currentColor"
            d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"
          />
        </svg>
        <span>{_formatNumber(data.statistics.comment_count)}</span>
      </div>
      {/* 分享部分 */}
      <div className="share mb2r">
        <img src={shareWhiteFull} alt="" className="share-image" />
        <span>{_formatNumber(data.statistics.share_count)}</span>
      </div>
      <BaseMusic />
    </div>
  );
};
export default ItemToolbar;
