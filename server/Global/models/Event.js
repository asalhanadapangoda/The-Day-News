import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tagline: {
      type: String,
      maxLength: [500, 'Tagline cannot exceed 500 characters'],
    },
    eventDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    heroImages: {
      type: [String],
      validate: [val => val.length <= 3, 'Cannot have more than 3 hero images'],
      required: true,
    },
    videoUrl: {
      type: String,
    },
    galleryImages: {
      type: [String],
      validate: [val => val.length <= 12, 'Cannot have more than 12 gallery images'],
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    albumUrl: {
      type: String,
    },
    articleLink: {
      type: String,
    },
    metaTitle: {
      type: String,
      default: '',
    },
    metaDescription: {
      type: String,
      default: '',
    },
    metaKeywords: {
      type: String,
      default: '',
    },
    metaImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
