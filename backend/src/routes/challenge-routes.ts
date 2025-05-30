import { Router } from 'express';
import { ChallengeController } from '../controllers/challenge-controller.js';

const router = Router();

router.post('/challenges', ChallengeController.create);
router.post('/challenges/:challenge_id/validate', ChallengeController.validateWord);
router.get('/challenges', ChallengeController.challengeByDate);

export default router;
