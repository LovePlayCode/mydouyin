import clsx from 'clsx';
import type { FC } from 'react';
import styles from './BaseButton.module.less';
import loadingWhite from '@/components/img/loading-white.png';

interface BaseButtonProps {
  loading: boolean;
  progress: number;
  loadingWithText: boolean;
  disabled: boolean;
  type: string;
  active: boolean;
  border: boolean;
  size: string;
  radius: string;
  preifxComment?: React.ReactNode;
  suffixComment?: React.ReactNode;
  children: React.ReactNode;
  btnClass: string;
}
const BaseButton: FC<Partial<BaseButtonProps>> = ({
  type,
  active,
  border,
  disabled,
  size,
  radius = 6,
  preifxComment,
  suffixComment,
  children,
  loading = false,
  loadingWithText,
  progress,
  btnClass = '',
}) => {
  const showText = () => {
    if (loading) {
      return loadingWithText;
    }
    return true;
  };
  return (
    <div
      className={clsx(styles.button, styles.primary, btnClass, {
        [type || '']: true,
        'no-active': !active,
        'no-border': !border,
        disabled,
        [size || '']: true,
      })}
      style={{ borderRadius: `${radius}rem` }}
    >
      {loading && <img src={loadingWhite} alt="" />}
      {preifxComment && preifxComment}

      {showText() && children}
      {suffixComment}
      {progress && (
        <div style={{ width: `${progress}%` }} className="progress" />
      )}
    </div>
  );
};
export default BaseButton;
