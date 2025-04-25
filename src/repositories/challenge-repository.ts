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
  static async isWordInChallenge(challengeId: string, word: string) {
    const found = await prisma.challengeWord.findFirst({
      where: {
        challenge_id: challengeId,
        word,
      },
    });

    return !!found;
  }

  static async isWordAlreadyFound(challengeId: string, word: string) {
    const found = await prisma.userWord.findFirst({
      where: {
        challenge_id: challengeId,
        word,
      },
    });

    return !!found;
  }

  static async addUserWord(challengeId: string, word: string) {
    const userWord = await prisma.userWord.create({
      data: {
        challenge_id: challengeId,
        word,
      },
    });

    return userWord;
  }

  static async incrementUserScore(challengeId: string) {
    const userScore = await prisma.userScore.upsert({
      where: { challenge_id: challengeId },
      update: {
        score: { increment: 1 },
        lastUpdated: new Date(),
      },
      create: {
        challenge_id: challengeId,
        score: 1,
      },
    });

    return userScore;
  }
}
