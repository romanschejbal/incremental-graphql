import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo-hooks';
import createClient from '../utils/createClient';

const graphqlClient = createClient();

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={graphqlClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}
