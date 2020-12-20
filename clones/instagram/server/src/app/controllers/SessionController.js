import User from '../models/User';
// import File from '../models/File';

class SessionController {
  async store(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email }).populate('avatar');

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    return res.json({
      user,
      token: user.generationToken(),
    });
  }
}

export default new SessionController();
