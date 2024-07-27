import { useSetState } from 'ahooks';
import styles from './Slide2.module.less';
import SlideItem from '@/components/SlideItem';
import SlideList from '@/components/SlideList';
import { HeaderEnum } from '@/common/contains';

const Slide2 = () => {
  const [state, setState] = useSetState({
    subTypeIsTop: false,
    subTypeHeight: 0,
  });
  return (
    <SlideItem SlideClass={styles['slide-item-class']}>
      <div className="sub-type-notice">100个直播</div>
      <SlideList
        SlideListStyle={{
          background: 'black',
          marginTop: state.subTypeIsTop ? state.subTypeHeight : 0,
        }}
        cbs={{ isLive: true }}
        uniqueId={HeaderEnum.LIVE}
      />
    </SlideItem>
  );
};
export default Slide2;
