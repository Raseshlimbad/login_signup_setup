import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { typeDefs } from './graphql/typeDefs';
import { userResolvers } from './graphql/resolvers/user.resolver';
import { PrismaClient } from '@prisma/client';
import { config } from './config';
import { SocketHandler } from './socket/socketHandler';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.CLIENT_URL 
      : 'http://localhost:3000',
    credentials: true
  }
});

const prisma = new PrismaClient();
const socketHandler = new SocketHandler(io);

app.use(cookieParser());
app.use(cors(config.server.cors));

// Socket.IO connection handling
io.on('connection', (socket) => {
  socketHandler.handleConnection(socket);
});

const server = new ApolloServer({
  typeDefs,
  resolvers: userResolvers,
  context: ({ req, res }) => ({ req, res, prisma }),
});

async function startServer() {
  try {
    await server.start();
    server.applyMiddleware({ app, cors: false } as any);
    
    httpServer.listen(config.server.port, () => {
      console.log(`🚀 Server ready at http://localhost:${config.server.port}${server.graphqlPath}`);
      console.log(`🔌 Socket.IO server is running`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
