import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  static async createUser() {
    const user = await prisma.user.create({
      data: {} 
    });

    return user;
  }
}