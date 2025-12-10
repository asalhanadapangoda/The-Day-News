import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema(
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
    shortDescription: {
      type: String,
      trim: true,
    },
    shortVideoLink: {
      type: String,
      trim: true,
    },
    fullVideoLink: {
      type: String,
      trim: true,
    },
    audioUrl: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    showNotes: {
      type: String,
    },
    transcript: {
      type: String,
    },
    host: {
      type: String,
      trim: true,
    },
    guest: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
podcastSchema.index({ createdAt: -1 });
podcastSchema.index({ featured: 1, createdAt: -1 });

const Podcast = mongoose.model('Podcast', podcastSchema);

export default Podcast;

