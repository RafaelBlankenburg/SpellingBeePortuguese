import { UserScoreRepository } from '../repositories/userscore-repository.js';
import { UserRepository } from '../repositories/user-repository.js';

export class UserScoreService {
  static async getPointsbyChallengeUser(user_id: string, challenge_id: string) {
    const userExists = await UserRepository.findById(user_id);

    if (!userExists) throw new Error(`No user found with Id: ${user_id}`);

    const userScore =
      await UserScoreRepository.getPointsbyChallengeUser(user_id, challenge_id);

    if (userScore !== null) {
      return userScore;
    } else {
      return null;
    }
  }
}