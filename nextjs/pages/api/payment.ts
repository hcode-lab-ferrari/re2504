import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../utils/session';
import axios from 'axios';
import { ScheduleCreate } from '../../types/ScheduleCreate';
import { ScheduleSession } from '../../types/ScheduleSession';
import { Schedule } from '../../types/Schedule';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
   
    const {
        cardToken,
        installments,
        paymentMethod,
        document,
        cardFirstSixDigits,
        cardLastFourDigits,
        paymentTypeId,
    } = req.body;
    const { scheduleAt, services, timeOptionId, billingAddressId } = req.session.schedule;
    const data = {
        timeOptionId: Number(timeOptionId),
        billingAddressId,
        scheduleAt,
        services,
        cardToken,
        installments,
        document,
        paymentMethod,
    } as ScheduleCreate;

    if (!cardToken) {
        res.status(400).send({
            message: 'Informe o token do cartão'
        })
    }

    if (!installments) {
        res.status(400).send({
            message: 'Informe as parcelas'
        })
    }

    const response = await axios.post<Schedule>(`/payment`, data, {
        baseURL: process.env.API_URL,
        headers: {
            'Authorization': `Bearer ${req.session.token}`
        }
    });

    const schedule = {
      ...(req.session.schedule ?? {}),
      cardFirstSixDigits,
      cardLastFourDigits,
      paymentTypeId,
      data: response.data,
    } as ScheduleSession;

    req.session.schedule = schedule;

    await req.session.save();

    res.status(200).json(response.data);

  } catch (e: any) {
    res.status(400).json({
      message: e.message,
    });
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
