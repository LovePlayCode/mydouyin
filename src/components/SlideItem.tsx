import clsx from 'clsx';
import type { FC } from 'react';

interface SlideItemProps {
  children: React.ReactNode;
  SlideClass?: string;
}
const SlideItem: FC<SlideItemProps> = ({ children, SlideClass }) => {
  return <div className={clsx('slide-item', SlideClass)}>{children}</div>;
};
export default SlideItem;
