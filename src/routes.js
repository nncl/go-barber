import {Router} from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  try {
    const user = await User.create({
      name: 'Caue Almeida',
      email: 'caue@exemplo.com.br',
      password_hash: '123456789',
    });

    res.json(user);
  } catch (e) {
    res.status(400).json(e);
  }
});

export default routes;
