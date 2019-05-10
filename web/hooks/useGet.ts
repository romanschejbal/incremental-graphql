import useGets from './useGets';

export default function useGet<T>(url: string) {
  const state = useGets<T>([url]);
  return { ...state, data: state.data ? state.data[0] : null };
}
