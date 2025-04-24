import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export class ChallengeRepository {
  static async createChallenge(data: {
    letters: string;
    centerLetter: string;
    words: string[];
  }) {
    return prisma.challenge.create({
      data: {
        letters: data.letters,
        centerLetter: data.centerLetter,
        challengeWords: {
          create: data.words.map(word => ({ word })),
        },
      },
      include: {
        challengeWords: true,
      },
    });
  }
}
