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

const ArticleCategory = mongoose.model('BdArticleCategory', articleCategorySchema, 'bd_articlecategorys');

export default ArticleCategory;
