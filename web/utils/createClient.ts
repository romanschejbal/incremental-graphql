import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';

export default function createClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: '/graphql',
      fetch: fetch,
    }),
  });
}
