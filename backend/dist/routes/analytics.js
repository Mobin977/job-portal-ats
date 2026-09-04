import { Router } from 'express';
import { getMetrics } from '../controllers/analytics.js';
import { authenticate, authorize } from '../middleware/auth.js';
const router = Router();
router.get('/metrics', authenticate, authorize(['ADMIN']), getMetrics);
export default router;
//# sourceMappingURL=analytics.js.map