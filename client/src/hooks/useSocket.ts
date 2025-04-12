import { SocketEvents, SocketEventName, ReservedSocketEvents } from '@/types/socket.types';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useCurrentUser } from './useCurrentUser';

export const useSocket = () => {
  const socket = useRef<Socket | undefined>(undefined);
  const user = useCurrentUser();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.current = io('http://localhost:4000', {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.current.on('connect', () => {
      setIsConnected(true);
    });

    socket.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = undefined;
        setIsConnected(false);
      }
    };
  }, []);

  useEffect(() => {
    if (socket.current && user?.id && isConnected) {
      socket.current.emit('join_room', user.id);

      return () => {
        socket.current?.emit('leave_room', user.id);
      };
    }
  }, [user, isConnected]);

  const sendMessage = <T extends SocketEventName>(
    event: T,
    data: SocketEvents[T]
  ): boolean => {
    if (socket.current && isConnected) {
      socket.current.emit(event, data);
      return true;
    }
    return false;
  };

  const subscribeToEvent = <T extends Exclude<SocketEventName, ReservedSocketEvents>>(
    event: T,
    callback: (data: SocketEvents[T]) => void
  ): void => {
    if (socket.current) {
      // Bypass socket.io-client's internal type inference for .on()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (socket.current.on as (event: string, cb: (...args: any[]) => void) => Socket)(
        event,
        (...args) => {
          callback(args[0] as SocketEvents[T]);
        }
      );
    }
  };

  const unsubscribeFromEvent = (event: SocketEventName): void => {
    socket.current?.off(event);
  };

  return {
    socket: socket.current,
    sendMessage,
    subscribeToEvent,
    unsubscribeFromEvent,
    isConnected,
  };
};
