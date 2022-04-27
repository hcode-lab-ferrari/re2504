import { IronSessionOptions } from 'iron-session';
import { ScheduleSession } from '../types/ScheduleSession';

export const sessionOptions: IronSessionOptions = {
  cookieName: 'ferrari-hcodelab/iron-session',
  password: String(process.env.SECRET_COOKIE),
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    schedule: ScheduleSession;
  }
}
