import type { FC } from 'react';
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
  const click = () => {
    emitter.emit(EVENTKEYENUM.SINGLE_CLICK_BROADCAST, {
      type: EVENTKEYENUM.ITEM_TOGGLE,
    });
  };
  useMount(() => {
    emitter.on(EVENTKEYENUM.SINGLE_CLICK, click);
  });
  useUnmount(() => {
    emitter.off(EVENTKEYENUM.SINGLE_CLICK, click);
  });
  return <SlideVerticalInfinite list={list} render={render} />;
};
export default SlideList;
