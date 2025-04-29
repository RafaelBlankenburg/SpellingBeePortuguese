import { Router } from 'express';
import { UserController } from '../controllers/user-controller.js';

const router = Router();

router.post('/users', UserController.create);

export default router;