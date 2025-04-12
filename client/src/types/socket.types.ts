// export interface SocketMessage {
//   event: string;
//   data: unknown;
// }

// export type SocketEvents = {
//   join_room: string;
//   leave_room: string;
//   message: string;
//   [key: string]: string | unknown;
// };

// export type SocketEventName = keyof SocketEvents & string;

// export type SocketCallback<T = unknown> = (data: T) => void;


export type SocketEvents = {
    join_room: string;
    leave_room: string;
    message: { userId: string; content: string }; // example shape
  };
  
  export type SocketEventName = keyof SocketEvents;
  
  export type SocketCallback<T = unknown> = (data: T) => void;

  export type ReservedSocketEvents = 'connect' | 'disconnect' | 'connect_error';