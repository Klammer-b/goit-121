import { model, Schema, Types } from 'mongoose';
import { GENDERS } from '../../constants/gender.js';
import { User } from './user.js';

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: Object.values(GENDERS) },
    avgMark: { type: Number, required: true },
    onDuty: { type: Boolean, default: true },
    parent: { type: Types.ObjectId, required: true, ref: User },
  },
  { timestamps: true, versionKey: false },
);

studentSchema.index({ name: 'text' });

export const Student = model('students', studentSchema);
