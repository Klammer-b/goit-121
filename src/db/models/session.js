import { model, Schema, Types } from 'mongoose';

const sessionSchema = new Schema(
  {
    accessToken: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true, unique: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
    userId: { type: Types.ObjectId, required: true, unique: true },
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('session', sessionSchema);
