import { Router } from 'express';

import { TagController } from '../controllers/tag-controller.js';

const router = Router();

router.get('/tags/:type?', TagController.list);

export default router;
