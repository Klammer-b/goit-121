import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const object = this.toObject();

  delete object.password;

  return object;
};

userSchema.pre('validate', function () {
  if (!this.username) {
    this.username = this.email;
  }
  console.log('user schema is ready for validation!');
});

userSchema.post('validate', function () {
  console.log('user schema validated successfully!');
});

export const User = model('users', userSchema);
