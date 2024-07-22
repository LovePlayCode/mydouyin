import clsx from 'clsx';

import { type FC, useRef } from 'react';
import { useUpdateEffect } from 'ahooks';
import styles from './FromBottomDialog.module.less';
import Dom, { _css } from '@/utils/dom';

interface FromBottomDialogProps {
  mode: 'dark' | 'light' | 'white';
  pageId: string;
  modelValue: boolean;
  showHengGang: boolean;
  children: React.ReactNode;
  header?: React.ReactNode;
  maskMode: string;
  height: string | number;
}
const FromBottomDialog: FC<FromBottomDialogProps> = ({
  mode = 'dark',
  showHengGang = false,
  children,
  modelValue = false,
  header,
  pageId,
  maskMode,
  height = 'calc(var(--vh, 1vh) * 70)',
}) => {
  const scroll = useRef(0);
  const pagePosition = useRef(null);
  useUpdateEffect(() => {
    // 获取 page  id
    const pageEl = document.getElementById(pageId);

    if (!pageEl) {
      return;
    }
    if (modelValue) {
      pageEl.style.position = 'absolute';
      pagePosition.current = _css(pageEl, 'position');
      scroll.current = document.documentElement.scrollTop;
      document.body.style.position = 'fixed';
      document.body.style.top = `${-scroll.current}px`;
      const maskTemplate = `<div class="Mask fade-in ${maskMode}"></div>`;
      const mask = new Dom().create(maskTemplate);
      setTimeout(() => {
        mask.on('click', (e: Event) => {});
      }, 200);
      pageEl.appendChild(mask.els[0]);
    } else {
      pageEl.style.position = pagePosition.current || 'fixed';
      document.body.style.position = 'static';
      document.documentElement.scrollTop = scroll.current;

      const mask = new Dom('.Mask').replaceClass('fade-in', 'fade-out');
      setTimeout(() => {
        mask.remove();
      }, 250);
    }
  }, [modelValue]);
  return modelValue ? (
    <>
      <div
        className={clsx(styles.FromBottomDialog, {
          mode,
          'no-heng-gang': showHengGang,
        })}
        style={{ height }}
      >
        {header && header}
        {showHengGang && (
          <div className={clsx('heng-gang', mode)}>
            <div className="content" />
          </div>
        )}

        <div className="wrapper">{children}</div>
      </div>
    </>
  ) : (
    <></>
  );
};
export default FromBottomDialog;
