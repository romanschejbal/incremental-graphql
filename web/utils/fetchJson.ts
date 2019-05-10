import fetch from 'isomorphic-fetch';

export default function fetchJson<T>(input: any, init?: any): Promise<T> {
  return fetch(input, init).then((res: any) => {
    if (res.status >= 400) {
      console.error(res);
      throw new Error(res.statusText);
    }
    return res.json();
  });
}
