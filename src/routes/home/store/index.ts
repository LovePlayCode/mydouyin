import { proxy, useSnapshot } from 'valtio';
import data from '@/routes/home/data.json';

type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U>
    ? Array<Mutable<U>>
    : T[P] extends object
    ? Mutable<T[P]>
    : T[P];
};

const store = proxy({
  list: data,
});
export const useHomeData = () => {
  const snapshot = useSnapshot(store);
  return snapshot as unknown as Mutable<typeof snapshot>;
};
