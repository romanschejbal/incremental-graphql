// @ts-ignore
import { createProxyServer } from 'http-proxy';

const proxy = createProxyServer({
  target: process.env.API_SERVER_HOST,
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

export default proxy;
