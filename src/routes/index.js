import { Router } from 'express';
import healthRouter from './health.js';
import studentsRouter from './students.js';
import authRouter from './auth.js';

const router = Router();

router.use(healthRouter);
router.use(studentsRouter);
router.use(authRouter);

export default router;
