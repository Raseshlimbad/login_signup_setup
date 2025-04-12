import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { UserService } from '../../services/user.service';
import { Context, JwtPayload, LoginInput, UserInput } from '../../types';

// Create a singleton instance of UserService
let userService: UserService;

export const userResolvers = {
  Query: {
    currentUser: async (_: unknown, __: unknown, { req, prisma }: Context) => {
      const token = req.cookies.token;
      if (!token) return null;
      
      try {
        const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
        userService = userService || new UserService(prisma);
        return userService.findUserById(decoded.userId);
      } catch {
        return null;
      }
    },
  },
  Mutation: {
    signup: async (_: unknown, { email, password, username }: UserInput, { prisma, res }: Context) => {
      userService = userService || new UserService(prisma);

      const user = await userService.createUser(email, password, username);
      const token = userService.generateToken(user.id);
      userService.setAuthCookie(res, token);

      return user;
    },

    login: async (_: unknown, { email, password }: LoginInput, { prisma, res }: Context) => {
      userService = userService || new UserService(prisma);
      
      const user = await userService.findUserByEmail(email);
      if (!user || !(await userService.validatePassword(password, user.password))) {
        throw new Error('Invalid credentials');
      }

      const token = userService.generateToken(user.id);
      userService.setAuthCookie(res, token);

      return user;
    },

    logout: (_: unknown, __: unknown, { res, prisma }: Context) => {
      userService = userService || new UserService(prisma);
      userService.clearAuthCookie(res);
      return true;
    },
  }
};