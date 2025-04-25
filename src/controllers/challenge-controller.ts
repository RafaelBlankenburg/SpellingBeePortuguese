import { Request, Response } from 'express';

import { ChallengeService } from '../services/challenge-service.js';

export class ChallengeController {
  static async create(req: Request, res: Response) {
    try {
      const {
      } = req.body;

      const user = await ChallengeService.createChallenge(
      );

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating challenge:', error);
      res.status(500).json({ error: 'Failed to create challenge' });
    }
  }

  static async validateWord(req: Request, res: Response) {
    const { challengeId } = req.params;
    const { word } = req.body;
  
    try {
      const result = await ChallengeService.validateWord(challengeId, word);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating challenge:', error);
      res.status(500).json({ error: 'Failed to create challenge' });
    }
  }

}

