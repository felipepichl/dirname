import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: String,
    image: String,
    size: Number,
    likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    /**
     * This field always saves the last user who liked the post and whenever
     * there is a new one, all records are deleted, leaving the last one.
     */
    lastLike: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

PostSchema.virtual('url').get(function() {
  return `${process.env.APP_URL}/posts/${encodeURIComponent(this.image)}`;
});

export default mongoose.model('Post', PostSchema);
