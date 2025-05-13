import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserScoreRepository {
  static async getPointsbyChallengeUser(user_id: string, challenge_id: string) {
    return prisma.userScore.findFirst({ 
      where: { user_id, challenge_id },
      select: { score: true },
    })  ;
  }
}