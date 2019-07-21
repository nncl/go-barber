import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // if (!(await schema.isValid(req.body))) {
    //   console.log(schema.err);
    //   return res.status(422).json({error: 'Validation failed'});
    // }

    schema
      .validate(req.body)
      .then(async () => {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email}});

        if (!user) {
          return res.status(401).json({error: 'User not found'});
        }

        if (!(await user.checkPassword(password))) {
          return res.status(401).json({error: 'Password does not match'});
        }

        const {id, name, provider} = user;

        return res.json({
          user: {
            id,
            name,
            provider,
          },
          token: jwt.sign({id}, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          }),
        });
      })
      .catch(err => {
        return res.status(422).json({errors: err.errors});
      });
  }
}

export default new SessionController();
