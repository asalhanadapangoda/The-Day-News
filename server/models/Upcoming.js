import mongoose from 'mongoose';

const upcomingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a podcast name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    photo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Upcoming = mongoose.model('Upcoming', upcomingSchema);

export default Upcoming;

