import express from 'express';
import graphqlHTTP from 'express-graphql';
import createExecutableSchema, { IContext } from './createExecutableSchema';
import fetch from 'isomorphic-fetch';
// import { addMockFunctionsToSchema } from 'graphql-tools';

const context: IContext = {
  fetchJson: url =>
    fetch(`${process.env.API_SERVER_HOST}${url.replace('/api/', '/')}`).then(
      response => response.json()
    ),
};

const schema = createExecutableSchema();
// addMockFunctionsToSchema({ schema });

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    context,
    graphiql: true,
  })
);

app.listen(4000);
