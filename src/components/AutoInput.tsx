import type { FC } from 'react';
import styles from './AutoInput.module.less';

interface AutoInputProps {
  modelValue: string;
}
const AutoInput: FC<AutoInputProps> = ({ modelValue }) => {
  return <div className={styles['auto-input']}>{modelValue}</div>;
};
export default AutoInput;
