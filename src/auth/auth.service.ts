import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<Auth> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${loginDto.email}`);
    }

    const passwordsIsMatch = this.comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!passwordsIsMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign({ userId: user.id });

    return { accessToken };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);

    return hash;
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, storedPasswordHash);
    return isMatch;
  }
}
