import * as Yup from 'yup';
import {Op} from 'sequelize';
import {
  startOfDay,
  endOfDay,
  setSeconds,
  setMinutes,
  setHours,
  format,
  isAfter,
} from 'date-fns';
import Appointment from '../models/Appointment';

class AvailableController {
  /**
   * @description
   * List available times to a user make an appointment
   *
   * @param req
   * @param res
   * @returns {Promise<*|Json|Promise<any>>}
   */

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

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
    ];

    // Transform appointment times into hh:mm as above
    const available = schedule.map(time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) && // is after now
          !appointments.find(a => format(a.date, 'HH:mm') === time), // and this date is not already booked
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
