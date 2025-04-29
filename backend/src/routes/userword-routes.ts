import { Router } from 'express';
import { UserWordController } from '../controllers/userword-controller.js';

const router = Router();

router.get('/userwords', UserWordController.list);

export default router;