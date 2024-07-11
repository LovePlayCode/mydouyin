import clsx from 'clsx';
import styles from './ItemDesc.module.less';

const ItemDesc = () => {
  return (
    <div className={clsx(styles['item-desc'], 'ml1r', 'mb1r')}>
      <div className="content">
        <div className="name mb1r f18 fb">@我是香秀🐂🍺</div>
        <div className="description">你说爱像云，要自在漂浮才美丽</div>
      </div>
    </div>
  );
};
export default ItemDesc;
