import mongoose from 'mongoose';

const articleCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ArticleCategory = mongoose.model('ZaArticleCategory', articleCategorySchema, 'za_articlecategorys');

export default ArticleCategory;
