import styles from './Loading.module.less';

/**
 *
 * @returns 加载组件
 */
const Loading = () => {
  return (
    <div className={styles.Loading}>
      <div className="circle blue" />
      <div className="circle red" />
    </div>
  );
};

export default Loading;
