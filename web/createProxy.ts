// @ts-ignore
import { createProxyServer } from 'http-proxy';

export default function(target: string) {
  const proxy = createProxyServer({
    target,
    xfwd: true,
  });

  proxy.on('error', function(_err: any, _req: any, res: any) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify(
        'Something went wrong. And we are reporting a custom error message.'
      )
    );
  });
  return proxy;
}
