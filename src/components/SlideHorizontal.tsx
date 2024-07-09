import { FC } from 'react';
import clsx from 'clsx';

interface SlideHorizontalProps {
  children: React.ReactNode;
  className?: string;
}
const SlideHorizontal: FC<SlideHorizontalProps> = ({ children, className }) => {
  return (
    <div className={clsx('slide', 'horizontal', className)}>
      <div className="slide-list">{children}</div>
    </div>
  );
};
export default SlideHorizontal;
