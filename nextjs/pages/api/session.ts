import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../utils/session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { token } = req.session;

    if (token) {
        res.status(200).send({
            token,
        });
    } else {
        req.session.destroy();
        await req.session.save();
        res.status(401);
    }

};

export default withIronSessionApiRoute(handler, sessionOptions);