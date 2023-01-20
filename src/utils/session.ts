import { IronSessionOptions } from 'iron-session';

export const ironSessionConfig: IronSessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'sorarium-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
};
