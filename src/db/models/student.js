import { model, Schema } from 'mongoose';
import { GENDERS } from '../../constants/gender.js';

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: Object.values(GENDERS) },
    avgMark: { type: Number, required: true },
    onDuty: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

studentSchema.index({ name: 'text' });

export const Student = model('students', studentSchema);
