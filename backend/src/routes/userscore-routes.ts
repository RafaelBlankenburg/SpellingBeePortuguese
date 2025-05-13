import { Router } from 'express';
import { UserScoreController } from '../controllers/userscore-controller.js';

const router = Router();

router.get('/userscore', UserScoreController.list);

export default router;