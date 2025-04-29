import { UserRepository } from '../repositories/user-repository.js';

export class UserService {
  static async createUser() {
    return await UserRepository.createUser();
  }
}