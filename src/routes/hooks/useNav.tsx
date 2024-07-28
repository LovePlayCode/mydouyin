import { useNavigate } from '@modern-js/runtime/router';

export function useNav() {
  const navigate = useNavigate();
  return (path: string, query: Record<string, any>, data?: any) => {
    navigate(path, {});
  };
}
