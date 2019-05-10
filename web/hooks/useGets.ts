import { useReducer, useEffect } from 'react';
import fetchJson from '../utils/fetchJson';

type State<Data> = {
  loading: boolean;
  data: Data | null;
  error: Error | null;
};

type Action<Data> =
  | {
      type: 'loading';
    }
  | {
      type: 'success';
      payload: Data;
    }
  | {
      type: 'error' | 'loading';
      payload: Error;
    };

type ApiReducer<Data> = (
  state: State<Data>,
  action: Action<Data>
) => State<Data>;

export default function useGets<T>(urls: string[]): State<T[]> {
  const [state, dispatch] = useReducer<ApiReducer<T[]>>(
    function(state, action) {
      switch (action.type) {
        case 'loading':
          return { ...state, loading: true };
        case 'success':
          return { loading: false, data: action.payload, error: null };
        case 'error':
          return { data: null, loading: false, error: action.payload };
        default:
          return state;
      }
    },
    { loading: true, data: null, error: null }
  );
  useEffect(
    function() {
      dispatch({ type: 'loading' });
      Promise.all(urls.map(url => fetchJson<T>(url)))
        .then(data => dispatch({ type: 'success', payload: data }))
        .catch(error => dispatch({ type: 'error', payload: error }));
    },
    [urls.join(',')]
  );
  return state;
}
