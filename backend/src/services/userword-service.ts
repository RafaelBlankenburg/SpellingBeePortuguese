import { UserWordRepository } from '../repositories/userword-repository.js';
import { UserRepository } from '../repositories/user-repository.js';

export class UserWordService {
  static async getWordbyChallengeUser(user_id: string, challenge_id: string) {
    const userExists = await UserRepository.findById(user_id);

    if (!userExists) throw new Error(`No user found with Id: ${user_id}`);

    const userWord =
      await UserWordRepository.getWordbyChallengeUser(user_id, challenge_id);

    if (userWord !== null) {
      return userWord;
    } else {
      return null;
    }
  }
}