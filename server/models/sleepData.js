import mongoose from 'mongoose';

const sleepDataSchema = mongoose.Schema({
  start: Date,
  end: Date,
  duration: Number,
});

export default sleepDataSchema;
