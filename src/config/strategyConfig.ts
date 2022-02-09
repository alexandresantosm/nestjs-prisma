import { ExtractJwt } from 'passport-jwt';

export const seupStrategy = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
