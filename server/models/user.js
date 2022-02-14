import mongoose from 'mongoose';

import sleepDataSchema from './sleepData';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: String,
  sleepData: [sleepDataSchema],
});

export default mongoose.model('User', userSchema);
