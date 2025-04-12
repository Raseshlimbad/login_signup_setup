import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export interface Context {
  req: Request;
  res: Response;
  prisma: PrismaClient;
}

export interface UserInput {
  email: string;
  password: string;
  username: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
}