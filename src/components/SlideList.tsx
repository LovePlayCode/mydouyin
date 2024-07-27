import type { FC } from 'react';

import type { HeaderEnum } from '@/common/contains';

import SlideVerticalInfinite from '@/components/SlideVerticalInfinite';
import { slideItemRender } from '@/utils/index';
import { useHomeData } from '@/routes/home/store';

interface SlideListProps {
  // data: any[];
  uniqueId: HeaderEnum;
  SlideListStyle?: React.CSSProperties;
  cbs?: {
    isLive: boolean;
  };
}
const SlideList: FC<SlideListProps> = ({ SlideListStyle, uniqueId, cbs }) => {
  const render = slideItemRender(cbs || {});
  const { list } = useHomeData();

  return (
    <SlideVerticalInfinite
      SlideVerticalStyle={SlideListStyle}
      list={list}
      render={render}
      uniqueId={uniqueId}
    />
  );
};
export default SlideList;
