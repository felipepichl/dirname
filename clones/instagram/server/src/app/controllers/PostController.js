import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import Post from '../models/Post';

class PostController {
  async index(req, res) {
    const posts = await Post.find()
      .sort('-createdAt')
      .populate({
        path: 'user',
        populate: {
          path: 'avatar',
        },
      })
      .populate({
        path: 'lastLike',
        select: '_id username avatar',
        populate: {
          path: 'avatar',
        },
      });
    return res.json(posts);
  }

  async store(req, res) {
    const { description } = req.body;
    const { filename: image, size } = req.file;

    /**
     * File resizing
     */
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', 'post', image));

    /**
     * Remove original file
     */
    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      user: req.userId,
      description,
      image,
      size,
    });
    return res.json(post);
  }
}

export default new PostController();
