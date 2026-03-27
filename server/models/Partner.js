import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    websiteUrl: {
      type: String,
    },
    logoSize: {
      type: String,
      default: '200x80',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
