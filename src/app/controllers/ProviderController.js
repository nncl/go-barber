import File from '../models/File';
import User from '../models/User';

class ProviderController {
  async index(req, res) {
    try {
      const providers = await User.findAll({
        where: {provider: true},
        attributes: ['id', 'name', 'email'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'name', 'url', 'path'],
          },
        ],
      });

      return res.json(providers);
    } catch (err) {
      return res.status(400).json({err});
    }
  }
}

export default new ProviderController();
