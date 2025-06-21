import { Request, Response } from 'express';

import { UserScoreService } from '../services/userscore-service.js';

export class UserScoreController {
  static async list(req: Request, res: Response) {
    try {
      const { user_id, challenge_id } = req.query;
      const tags = await UserScoreService.getPointsbyChallengeUser(
        user_id as string,
        challenge_id as string,
      );
      res.status(200).json(tags);
    } catch (error) {
      console.error('Error fetching user score:', error);
      res.status(500).json({ error: 'Failed to fetch user score' });
    }
  }
}