import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

const createSession = (userId) => ({
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15), //15 min
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 days
  user: userId,
});

export const registerUser = async ({ email, password, username }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'User is already registered!');
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: encryptedPassword,
    username,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw createHttpError(400, 'Email and password are invalid!');
  }

  const arePasswordEqual = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!arePasswordEqual) {
    throw createHttpError(400, 'Email and password are invalid!');
  }

  await Session.findOneAndDelete({ userId: existingUser._id });

  const session = await Session.create(createSession(existingUser._id));

  return session;
};

export const logoutUser = async (sessionId, refreshToken) => {
  await Session.findOneAndDelete({ _id: sessionId, refreshToken });
};

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(404, 'Session not found!');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await Session.findByIdAndDelete(session._id);
    throw createHttpError(401, 'Session expired');
  }

  const user = await User.findById(session.user);

  if (!user) {
    throw createHttpError(404, 'Session not found!');
  }

  await Session.findByIdAndDelete(session._id);

  const newSession = await Session.create(createSession(user._id));

  return newSession;
};
