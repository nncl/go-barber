import * as Yup from 'yup';
import {Op} from 'sequelize';
import {startOfDay, endOfDay} from 'date-fns';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const schema = Yup.object().shape({
      date: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(422).json({error: 'Validation failed'});
    }

    const {date} = req.query;
    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    return res.json(appointments); // fixme
  }
}

export default new AvailableController();
