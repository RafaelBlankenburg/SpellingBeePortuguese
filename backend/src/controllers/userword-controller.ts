import { Request, Response } from 'express';

import { UserWordService } from '../services/userword-service.js';

export class UserWordController {
  static async list(req: Request, res: Response) {
    try {
      const { user_id, challenge_id } = req.body;
      const tags = await UserWordService.getWordbyChallengeUser(
        user_id as string,
        challenge_id as string,
      );
      res.status(200).json(tags);
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      res.status(500).json({ error: 'Failed to fetch user preferences' });
    }
  }
}