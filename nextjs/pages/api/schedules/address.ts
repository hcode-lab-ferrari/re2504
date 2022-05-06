import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ScheduleSession } from "../../../types/ScheduleSession";
import { sessionOptions } from "../../../utils/session";

export default withIronSessionApiRoute(async function (req: NextApiRequest, res: NextApiResponse) {

    try {

        const schedule = {
            ...(req.session.schedule ?? {}),
            billingAddressId: Number(req.body.billingAddressId),
        } as ScheduleSession;

        req.session.schedule = schedule;
  
        await req.session.save();
    
        res.status(200).json(req.session.schedule);

    } catch (e: any) {

        res.status(400).json({
            message: e.message,
        });

    }

}, sessionOptions);