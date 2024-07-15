import styles from './BaseFooter.module.less';
import addIcon from './img/add-light.png';

const BaseFooter = () => {
  return (
    <div className={styles.footer}>
      <div className="l-button">
        <span>首页</span>
        <img src="" alt="" />
      </div>
      <div className="l-button">
        <span>商城</span>
        <img src="" alt="" />
      </div>
      <div className="l-button">
        <div className="add-ctn">
          <img src={addIcon} alt="" />
        </div>
      </div>
      <div className="l-button">
        <span>消息</span>
        <img src="" alt="" />
      </div>
      <div className="l-button">
        <span>我</span>
        <img src="" alt="" />
      </div>
    </div>
  );
};
export default BaseFooter;
