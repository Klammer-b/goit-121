import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  res.json({ message: 'OK' });
});

export default healthRouter;
