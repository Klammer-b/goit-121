import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { sendResetPasswordEmail } from './email.js';
import { getEnv } from '../helpers/getEnv.js';
import { ENV_VARS } from '../constants/env.js';

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

export const requestResetPasswordEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  const token = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    getEnv(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '15m',
    },
  );

  await sendResetPasswordEmail({
    email,
    payload: {
      userName: user.username,
      resetUrl: `${getEnv(ENV_VARS.FRONTEND_DOMAIN)}/auth/reset-password?token=${token}`,
    },
  });
};

export const resetPassword = async ({ token, password }) => {
  let payload;

  try {
    payload = jwt.verify(token, getEnv(ENV_VARS.JWT_SECRET));
  } catch (err) {
    console.log(err);

    throw createHttpError(401, err.message);
  }

  const user = await User.findOne({
    _id: payload.sub,
    email: payload.email,
  });

  if (!user) {
    throw createHttpError(401, 'Unauthorized');
  }

  await User.findByIdAndUpdate(user._id, {
    password: await bcrypt.hash(password, 10),
  });

  await Session.findOneAndDelete({ userId: user._id });
};
