import { HeaderEnum } from '@/common/contains';
import SlideItem from '@/components/SlideItem';
import SlideList from '@/components/SlideList';

const Slide0 = () => {
  return (
    <>
      <SlideItem>
        <SlideList uniqueId={HeaderEnum.HOT} />
      </SlideItem>
    </>
  );
};
export default Slide0;
