import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { seupStrategy } from 'src/config/strategyConfig';
import { AuthService } from './auth.service';

@Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super(seupStrategy);
  }

  async validate(payload: { userId: string }) {
    const validUser = await this.auth.validateUser(payload.userId);

    if (!validUser) {
      throw new UnauthorizedException();
    }

    return validUser;
  }
}
