export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-key',
    expiresIn: '7d' // Use string timespan format instead of number
  },
  server: {
    port: parseInt(process.env.PORT || '4000'),
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? 'https://your-production-domain.com' 
        : 'http://localhost:3000',
      credentials: true
    }
  }
};