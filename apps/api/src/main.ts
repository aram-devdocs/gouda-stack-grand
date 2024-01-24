// import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
// import { createHandler } from 'graphql-http/lib/use/express';
// import { graphqlHTTP } from 'express-graphql'; // No longer maintained, use graphql-http instead, but for view purposes, we will use this
import express from 'express';
import * as path from 'path';
import { getApolloServer, getUrlFromStandaloneServer } from './apollo';

// // TODO: Replace with your own schema
// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve: () => 'Hello, world!',
//       },
//     },
//   }),
// });

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

// app.all('/graphql', createHandler({ schema }));

// app.use(
//   '/graphql/view',
//   graphqlHTTP({
//     schema: schema,
//     graphiql: true,
//   })
// );

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
  // console.log(`GraphQL server query at http://localhost:${port}/graphql`);
  // console.log(`GraphQL server view at http://localhost:${port}/graphql/view`);
});
server.on('error', console.error);

// Start Apollo Server

(async () => {
  const apolloServer = await getApolloServer();
  const { url } = await getUrlFromStandaloneServer(apolloServer);
  console.log(`Apollo Server ready at ${url}`);
})();
