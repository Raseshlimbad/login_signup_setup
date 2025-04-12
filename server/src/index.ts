import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { typeDefs } from './graphql/typeDefs';
import { userResolvers } from './graphql/resolvers/user.resolver';
import { PrismaClient } from '@prisma/client';
import { config } from './config';

const app = express();
const prisma = new PrismaClient();

app.use(cookieParser());
app.use(cors(config.server.cors));

const server = new ApolloServer({
  typeDefs,
  resolvers: userResolvers,
  context: ({ req, res }) => ({ req, res, prisma }),
});

async function startServer() {
  try {
    await server.start();
    server.applyMiddleware({ app, cors: false } as any);
    
    app.listen(config.server.port, () => {
      console.log(`🚀 Server ready at http://localhost:${config.server.port}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
