import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'graphql-tag';
import { gasStationsTypeDef } from './schema/generic';
import { gasStationsResolver } from './resolvers/generic';

const schema = makeExecutableSchema({
  typeDefs: gql(gasStationsTypeDef),
  resolvers: gasStationsResolver,
});

const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀 Server ready at ${url}`);
