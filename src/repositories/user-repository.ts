import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  static async createUser() {
    const user = await prisma.user.create({
      data: {} 
    });

    return user;
  }
  static async findById(id: string) {
    if (!id) {
      throw new Error('User ID is required');
    }
    return await prisma.user.findUnique({
      where: { id },
    });
  }
}