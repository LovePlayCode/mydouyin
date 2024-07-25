import { useMount } from 'ahooks';
import { type FC, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Back.module.less';
import { _css } from '@/utils/dom';

interface BackProps {
  mode?: string;
  img?: string;
  direction?: string;
  scale?: string;
  backClass?: string;
}
const Back: FC<BackProps> = ({
  direction = 'left',
  scale = '1',
  mode = 'gray',
  img = 'back',
  backClass = '',
}) => {
  const imgEl = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  //   const chooseBackImg = ()=>{
  //     switch(true)
  //   }
  useMount(() => {
    import(`@/components/img/${mode}-${img}.png`).then(res => {
      setImgSrc(res?.default || '');
    });
    _css(
      imgEl.current,
      'transform',
      `rotate(${direction === 'left' ? '0' : '180'}deg) scale(${scale})`,
    );
  });
  return (
    <img
      src={imgSrc}
      ref={imgEl}
      className={clsx(backClass, styles.imgWrapper, 'close')}
      alt=""
    />
  );
};
export default Back;
