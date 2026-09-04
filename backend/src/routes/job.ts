import { Router } from 'express';
import { createJob, searchJobs } from '../controllers/job.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
router.get('/', searchJobs);
router.post('/', authenticate, authorize(['RECRUITER', 'ADMIN']), createJob);

export default router;
