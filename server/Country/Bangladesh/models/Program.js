import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
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
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    logoImage: {
      type: String,
    },
    posterImage: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

const Program = mongoose.model('BdProgram', programSchema, 'bd_programs');

export default Program;
