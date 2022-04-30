import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../utils/session';
import axios from 'axios';
import { ScheduleCreate } from '../../types/ScheduleCreate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
   
    const {
        cardToken,
        installments,
        paymentMethod,
        cardDocument
    } = req.body;
    const { scheduleAt, services, timeOptionId } = req.session.schedule;
    const data = {
        timeOptionId,
        billingAddressId: 1,
        scheduleAt,
        services,
        cardToken,
        installments,
        document: cardDocument,
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

    const response = await axios.post<ScheduleCreate>(`/payment`, data, {
        baseURL: process.env.API_URL,
        headers: {
            'Authorization': `Bearer ${req.session.token}`
        }
    }) ;

    res.status(200).json(response.data);

  } catch (e: any) {
    res.status(400).json({
      message: e.message,
    });
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
