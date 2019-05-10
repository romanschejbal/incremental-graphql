import { createServer } from 'http';
import { parse } from 'url';
import * as next from 'next';
import apiProxy from './apiProxy';
import gqlProxy from './gqlProxy';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req: any, res: any) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname && pathname.startsWith('/api/')) {
      req.url = req.url.replace('/api/', '/');
      apiProxy.web(req, res);
    } else if (pathname === '/graphql') {
      gqlProxy.web(req, res);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});
