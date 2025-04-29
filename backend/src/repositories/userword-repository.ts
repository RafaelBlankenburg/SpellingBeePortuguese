import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserWordRepository {
  static async getWordbyChallengeUser(user_id: string, challenge_id: string) {
    return prisma.userWord.findMany({ where: { user_id, challenge_id } });
  }
}