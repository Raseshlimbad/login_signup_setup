import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from '../config';
import { Response } from 'express';

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(email: string, password: string, username: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashed,
        username,
        isAdmin: false
      }
    });
  }

  async validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(userId: string) {
    const signOptions: SignOptions = {
      expiresIn: '7d'
    };

    return jwt.sign(
      { userId },
      config.jwt.secret as Secret,
      signOptions
    );
  }

  setAuthCookie(res: Response, token: string) {
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
  }

  clearAuthCookie(res: Response) {
    res.clearCookie('token');
  }
}