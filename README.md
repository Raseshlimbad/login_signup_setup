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

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Sonner (Toast notifications)
- GraphQL Client

### Backend

- Node.js
- Express
- GraphQL (Apollo Server)
- PostgreSQL
- Prisma ORM
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
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── store/        # Redux store
│   │   └── types/        # TypeScript types
│   └── public/           # Static files
└── server/                # Backend application
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── graphql/      # GraphQL schemas and resolvers
    │   ├── services/     # Business logic
    │   └── types/        # TypeScript types
    └── prisma/           # Database schema and migrations
```

## Contributing

1. Fork the repository
2. Create your feature branch ( git checkout -b feature/AmazingFeature )
3. Commit your changes ( git commit -m 'Add some AmazingFeature' )
4. Push to the branch ( git push origin feature/AmazingFeature )
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
