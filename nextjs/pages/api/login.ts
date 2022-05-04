import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from "../../utils/session";
import { apiPostLogin } from "../../utils/apiPostLogin";

export default withIronSessionApiRoute(apiPostLogin('/auth/login'), sessionOptions);