import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Neo4jGraphQL } from '@neo4j/graphql';
import neo4j from 'neo4j-driver';

// TODO: Replace with your own schema
const typeDefs = `#graphql
    type Movie {
        title: String
        actors: [Actor!]! @relationship(type: "ACTED_IN", direction: IN)
    }

    type Actor {
        name: String
        movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
    }
`;

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('username', 'password')
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

export const getApolloServer = async () => {
  const server = new ApolloServer({
    schema: await neoSchema.getSchema(),
  });

  return server;
};

export const getUrlFromStandaloneServer = async (server: ApolloServer) => {
  return await startStandaloneServer(server, {
    context: async ({ req }) => ({ req }),
    listen: { port: 4000 },
  });
};
