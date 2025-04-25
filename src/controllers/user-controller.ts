
import { Request, Response } from 'express';
import { UserService } from '../services/user-service.js';

export class UserController {
  static async create(req: Request, res: Response) {
    try {
        
    const {
    } = req.body;

      const user = await UserService.createUser();

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
}
