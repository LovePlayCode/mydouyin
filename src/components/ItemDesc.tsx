import clsx from 'clsx';
import type { FC } from 'react';
import styles from './ItemDesc.module.less';
import type { AwemeData } from '@/common/data';

interface ItemDescProps {
  data: AwemeData;
}
const ItemDesc: FC<ItemDescProps> = ({ data }) => {
  return (
    <div className={clsx(styles['item-desc'], 'ml1r', 'mb1r')}>
      <div className="content">
        <div className="name mb1r f18 fb">@{data.author.nickname}</div>
        <div className="description">{data.desc}</div>
      </div>
    </div>
  );
};
export default ItemDesc;
