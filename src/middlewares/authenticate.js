import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw createHttpError(401, 'Authorization header is required!');
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    throw createHttpError(401, 'Token must be of type bearer!');
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (session.accessTokenValidUntil < new Date()) {
    await Session.findByIdAndDelete(session._id);
    throw createHttpError(401, 'Session expired!');
  }

  const sessionWithUser = await session.populate('user');

  if (!sessionWithUser.user) {
    throw createHttpError(401, 'Session not found!');
  }

  req.user = sessionWithUser.user;

  next();
};
