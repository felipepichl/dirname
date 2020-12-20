import Post from '../models/Post';

class LikeController {
  async toggle(req, res) {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ error: "Post doesn't exist" });
    }

    const liked = post.likes.indexOf(req.userId);

    if (liked === -1) {
      /**
       * True for like.
       */
      post.likes.push(req.userId);

      post.lastLike = [];
      post.lastLike.push(req.userId);
    } else {
      post.likes.splice(liked, 1);
    }

    await post.save();

    return res.json(post);
  }
}

export default new LikeController();
