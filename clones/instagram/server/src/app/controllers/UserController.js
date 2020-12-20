import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.find({ _id: { $ne: req.userId } })
      .sort('-createdAt')
      .populate('avatar');

    return res.json(users);
  }

  async show(req, res) {
    const user = await User.findById(req.params.id).populate('avatar');

    return res.json(user);
  }

  async store(req, res) {
    const { email } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const user = await User.create(req.body);

    return res.json({
      user,
    });
  }

  async update(req, res) {
    const { name, email, avatar_id: avatar } = req.body;

    await User.findByIdAndUpdate(req.userId, {
      name,
      email,
      avatar,
    });

    const user = await User.findOne({ email }).populate('avatar');

    return res.json({
      user,
    });
  }
}

export default new UserController();
