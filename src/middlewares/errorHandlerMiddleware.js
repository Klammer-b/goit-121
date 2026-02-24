export const errorHandlerMiddleware = (error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    text: error.message,
  });
};
