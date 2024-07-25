import { proxy, useSnapshot } from 'valtio';
import data from '@/routes/home/data.json';
import resource from '@/common/resource';

type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U>
    ? Array<Mutable<U>>
    : T[P] extends object
    ? Mutable<T[P]>
    : T[P];
};

const store = proxy({
  list: data,
  friends: resource.users.all,
});
export const useHomeData = () => {
  const snapshot = useSnapshot(store);
  return snapshot as unknown as Mutable<typeof snapshot>;
};
