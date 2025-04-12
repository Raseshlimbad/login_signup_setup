import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class SocketHandler {
  private io: Server;
  private activeUsers: Map<string, Set<string>>;
  private rooms: Map<string, Set<string>>;

  constructor(io: Server) {
    this.io = io;
    this.activeUsers = new Map();
    this.rooms = new Map();
  }

  handleConnection(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
    console.log('User connected:', socket.id);
    let currentUserId: string | null = null;

    socket.on('join_room', (userId: string) => {
      currentUserId = userId;
      if (!this.activeUsers.has(userId)) {
        this.activeUsers.set(userId, new Set());
      }
      socket.join(userId);
      this.io.emit('user_online', { userId });
      console.log(`User ${socket.id} joined room ${userId}`);
    });

    socket.on('join_chat_room', ({ roomId, userId }: { roomId: string; userId: string }) => {
      socket.join(roomId);
      if (!this.rooms.has(roomId)) {
        this.rooms.set(roomId, new Set());
      }
      this.rooms.get(roomId)?.add(userId);
      this.activeUsers.get(userId)?.add(roomId);
      this.io.to(roomId).emit('user_joined_room', { userId, roomId });
    });

    socket.on('message', ({ roomId, message, userId }: { roomId: string; message: string; userId: string }) => {
      this.io.to(roomId).emit('new_message', { message, userId, roomId });
    });

    socket.on('leave_room', (userId: string) => {
      socket.leave(userId);
      console.log(`User ${socket.id} left room ${userId}`);
    });

    socket.on('disconnect', () => {
      if (currentUserId) {
        this.handleDisconnect(currentUserId);
      }
      console.log('User disconnected:', socket.id);
    });
  }

  private handleDisconnect(userId: string) {
    this.activeUsers.get(userId)?.forEach(roomId => {
      this.rooms.get(roomId)?.delete(userId);
      if (this.rooms.get(roomId)?.size === 0) {
        this.rooms.delete(roomId);
      }
      this.io.to(roomId).emit('user_left_room', { userId, roomId });
    });

    this.activeUsers.delete(userId);
    this.io.emit('user_offline', { userId });
  }
}