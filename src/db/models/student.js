import { model, Schema } from 'mongoose';

const studentSchema = new Schema(
  {
    name: { type: String, require: true },
    age: { type: Number, require: true },
    gender: { type: String, require: true, enum: ['male', 'female', 'other'] },
    avgMark: { type: Number, require: true },
    onDuty: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const Student = model('students', studentSchema);
