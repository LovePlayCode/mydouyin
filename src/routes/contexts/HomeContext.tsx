import { createContext } from 'react';

const HomeContext = createContext({
  modelValue: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModelValue: (val: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNavIndex: (val: number) => {},
});
export default HomeContext;
