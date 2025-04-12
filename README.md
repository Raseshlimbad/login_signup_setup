````markdown
# Full Stack Login/Signup System

A modern authentication system built with React, Node.js, GraphQL, and TypeScript.

## Features

- 🔐 Secure user authentication
- 📝 User registration with validation
- 🚀 GraphQL API
- 🎨 Modern UI with Tailwind CSS
- 🔄 Redux state management
- 🍪 HTTP-only cookie session management
- ⚡ TypeScript support
- 🛡️ Password encryption with bcrypt
- Real-time Status Updates

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Socket.IO Client
- Sonner (Toast notifications)
- GraphQL Client

### Backend

- Node.js
- Express
- GraphQL (Apollo Server)
- PostgreSQL
- Prisma ORM
- Socket.IO
- JWT Authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd login_signup
```
````

````

2. Install dependencies:
For the server:

```bash
cd server
npm install
````

For the client:

```bash
cd client
npm install
```

3. Set up environment variables:
   Create a .env file in the server directory:

```plaintext
DATABASE_URL="postgresql://postgres:ROOT@localhost:5433/Login_Signup?schema=public"
JWT_SECRET="your-secret-key"
PORT=4000
```

````

4. Initialize the database:
```bash
cd server
npx prisma migrate dev
````

### Running the Application

1. Start the server:

```bash
cd server
npm run dev
```

2. Start the client:

```bash
cd client
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- GraphQL Playground: http://localhost:4000/graphql

## Features in Detail

### Authentication

- Secure password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies for secure token storage
- Protected routes
- Automatic token refresh

### User Management

- User registration with email validation
- Secure login system
- User profile management
- Session management

### Security Features

- Password strength validation
- Email format validation
- Protected API endpoints
- CORS configuration
- HTTP-only cookies
- Input sanitization

Project Structure
The project is structured as follows:

```plaintext
login_signup/
login_signup/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   │   ├── auth/     # Authentication pages
│   │   │   ├── projects/ # Project pages
│   │   │   └── tasks/    # Task pages
│   │   ├── components/   # React components
│   │   │   ├── auth/     # Auth-related components
│   │   │   ├── chat/     # Chat components
│   │   │   └── shared/   # Shared components
│   │   ├── hooks/        # Custom hooks
│   │   │   ├── useSocket.ts    # Socket hook
│   │   │   └── useCurrentUser.ts # User hook
│   │   ├── store/        # Redux store
│   │   │   ├── authSlice.ts    # Auth state
│   │   │   └── chatSlice.ts    # Chat state
│   │   └── types/        # TypeScript types
│   │       ├── auth.types.ts    # Auth types
│   │       └── socket.types.ts  # Socket types
│   └── public/           # Static files
└── server/               # Backend application
    ├── src/
    │   ├── config/      # Configuration files
    │   ├── graphql/     # GraphQL schemas and resolvers
    │   │   ├── resolvers/
    │   │   └── typeDefs/
    │   ├── services/    # Business logic
    │   │   ├── auth.service.ts
    │   │   └── user.service.ts
    │   ├── socket/      # Socket.IO handlers
    │   │   ├── socketHandler.ts
    │   │   └── events/
    │   ├── middleware/  # Custom middleware
    │   │   ├── auth.middleware.ts
    │   │   └── error.middleware.ts
    │   └── types/      # TypeScript types
    │       ├── auth.types.ts
    │       └── socket.types.ts
    └── prisma/         # Database schema and migrations
        ├── migrations/
        └── schema.prisma
```

## Socket.IO Features
- Real-time user status (online/offline)
- Private messaging rooms
- Room management
- Typing indicators
- Message delivery status
- Auto-reconnection
- Room cleanup on disconnect
## API Structure
### GraphQL Endpoints
- Authentication (login, signup, logout)
- User management
- Project operations
- Task management
### Socket Events
- join_room : Join a private room
- leave_room : Leave a room
- message : Send messages
- user_online : User online status
- user_offline : User offline status
- typing_start : User started typing
- typing_end : User stopped typing

## Contributing

1. Fork the repository
2. Create your feature branch ( git checkout -b feature/AmazingFeature )
3. Commit your changes ( git commit -m 'Add some AmazingFeature' )
4. Push to the branch ( git push origin feature/AmazingFeature )
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
