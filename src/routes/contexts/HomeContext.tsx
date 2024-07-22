import { createContext } from 'react';

const HomeContext = createContext({
  modelValue: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModelValue: (val: any) => {},
});
export default HomeContext;
