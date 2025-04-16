import { Request, Response } from 'express';

import { TagService } from '../services/tag-service.js';

export class TagController {
  static async list(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const tags = await TagService.getTags(type as string);
      res.status(200).json(tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
      res.status(500).json({ error: 'Failed to fetch tags' });
    }
  }
}
