import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../utils/session";

export default withIronSessionApiRoute(async (req: NextApiRequest, res: NextApiResponse) => {

    req.session.destroy();
    await req.session.save();
    res.status(204).end();

}, sessionOptions);