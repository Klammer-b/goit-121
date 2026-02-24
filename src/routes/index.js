import { Router } from 'express';
import healthRouter from './health.js';
import studentsRouter from './students.js';

const router = Router();

router.use(healthRouter);
router.use(studentsRouter);

export default router;
