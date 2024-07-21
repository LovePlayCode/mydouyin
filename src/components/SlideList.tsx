import { FC, useRef } from 'react';
import { useMount, useUnmount } from 'ahooks';
import type { HeaderEnum } from '@/common/contains';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';

import SlideVerticalInfinite from '@/components/SlideVerticalInfinite';
import { slideItemRender } from '@/utils/index';
import { useHomeData } from '@/routes/home/store';

interface SlideListProps {
  // data: any[];
  uniqueId: HeaderEnum;
}
const SlideList: FC<SlideListProps> = () => {
  const render = slideItemRender({});
  const { list } = useHomeData();

  return <SlideVerticalInfinite list={list} render={render} />;
};
export default SlideList;
