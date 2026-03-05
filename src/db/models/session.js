import { model, Schema, Types } from 'mongoose';
import { User } from './user.js';

const sessionSchema = new Schema(
  {
    accessToken: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true, unique: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
    user: { type: Types.ObjectId, required: true, unique: true, ref: User },
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('session', sessionSchema);
