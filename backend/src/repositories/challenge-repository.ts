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
  static async isWordInChallenge(challenge_id: string, word: string) {
    const found = await prisma.challengeWord.findFirst({
      where: {
        challenge_id: challenge_id,
        word,
      },
    });

    return !!found;
  }

  static async isWordAlreadyFound(challenge_id: string, user_id: string, word: string) {
    const found = await prisma.userWord.findFirst({
      where: {
        challenge_id: challenge_id,
        user_id: user_id,
        word,
      },
    });
  
    return !!found;
  }
  

  static async addUserWord(challenge_id: string, user_id: string, word: string) {
    const userWord = await prisma.userWord.create({
      data: {
        challenge_id: challenge_id,
        user_id: user_id,
        word,
      },
    });
  
    return userWord;
  }

  static async incrementUserScore(challenge_id: string, userId: string) {
    const userScore = await prisma.userScore.upsert({
      where: {
        user_id_challenge_id: {
          user_id: userId,
          challenge_id: challenge_id,
        },
      },
      update: {
        score: { increment: 1 },
        lastUpdated: new Date(),
      },
      create: {
        user_id: userId,
        challenge_id: challenge_id,
        score: 1,
      },
    });
  
    return userScore;
  }

  static async getTodayChallenge() {
    try {

      const now = new Date();
      const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
      const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

      const challenge = await prisma.challenge.findFirst({
        where: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      return challenge;
    } catch (error) {
      console.error('Erro em getTodayChallenge:', error);
      throw new Error('Falha ao buscar o challenge do dia');
    }
  }
}