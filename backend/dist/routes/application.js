import { Router } from 'express';
import multer from 'multer';
import { applyJob, getRecruiterApplications, updateStatus } from '../controllers/application.js';
import { authenticate, authorize } from '../middleware/auth.js';
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
router.post('/apply/:jobId', authenticate, authorize(['CANDIDATE']), upload.single('resume'), applyJob);
router.get('/recruiter-dashboard', authenticate, authorize(['RECRUITER', 'ADMIN']), getRecruiterApplications);
router.patch('/:id/status', authenticate, authorize(['RECRUITER', 'ADMIN']), updateStatus);
export default router;
//# sourceMappingURL=application.js.map