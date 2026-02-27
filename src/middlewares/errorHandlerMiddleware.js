import { isHttpError } from 'http-errors';

export const errorHandlerMiddleware = (error, req, res, next) => {
  console.error(error);

  if (isHttpError(error)) {
    return res.status(error.status).json({
      status: error.status,
      message: error.name,
      text: error.message,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    text: error.message,
  });
};
