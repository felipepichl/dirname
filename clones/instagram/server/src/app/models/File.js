import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    key: String,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

FileSchema.virtual('url').get(function() {
  return `${process.env.APP_URL}/files/${encodeURIComponent(this.key)}`;
});

export default mongoose.model('File', FileSchema);
