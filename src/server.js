import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { getEnv } from './helpers/getEnv.js';
import { ENV_VARS } from './constants/env.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import router from './routes/index.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { UPLOADS_DIR } from './constants/paths.js';

export const startServer = () => {
  const app = express();

  app.use(cors(), cookieParser());
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(router);

  app.use('/uploads', express.static(UPLOADS_DIR));

  app.use(notFoundMiddleware);

  app.use(errors());

  app.use(errorHandlerMiddleware);

  const PORT = getEnv(ENV_VARS.PORT, 8080);

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server started on port ${PORT}`);
  });
};
