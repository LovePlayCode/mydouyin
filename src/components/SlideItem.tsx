import { FC } from 'react';

interface SlideItemProps {
  children: React.ReactNode;
}
const SlideItem: FC<SlideItemProps> = ({ children }) => {
  return <div className="slide-item">{children}</div>;
};
export default SlideItem;
