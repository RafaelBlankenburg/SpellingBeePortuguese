import { Router } from 'express';

import { ChallengeController } from '../controllers/challenge-controller.js';

const router = Router();

router.post('/challenges/', ChallengeController.create);

export default router;
