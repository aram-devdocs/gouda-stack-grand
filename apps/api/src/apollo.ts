import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Neo4jGraphQL } from '@neo4j/graphql';
import neo4j from 'neo4j-driver';

const neo4j_driver = process.env.NEO4J_URI;
const neo4j_user = process.env.NEO4J_USER;
const neo4j_password = process.env.NEO4J_PASSWORD;
const apollo_port: number = Number(process.env.PORT) || 4000;

if (!neo4j_driver || !neo4j_user || !neo4j_password) {
  throw new Error(
    'Missing Neo4j credentials:' +
      JSON.stringify({ neo4j_driver, neo4j_user, neo4j_password })
  );
}

// TODO: Replace with your own schema, generated from graphql-codegen
export const typeDefs = `
    type User {
        id: ID
        name: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        createUser(name: String!): User
    }
`;

export const driver = neo4j.driver(
  neo4j_driver,
  neo4j.auth.basic(neo4j_user, neo4j_password)
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
    listen: { port: apollo_port },
  });
};
