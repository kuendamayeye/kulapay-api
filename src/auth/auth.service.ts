import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signupLocal(createUserDto: CreateUserDto): Promise<Tokens> {
    try {
      const hash = await this.hashData(createUserDto.pin);

      const newUser = await this.prisma.utilizador.create({
        data: {
          nomeCompleto: createUserDto.nomeCompleto,
          email: createUserDto.email,
          hashPin: hash,
          estado: createUserDto.estado,
          telefone: createUserDto.telefone,
        },
      });

      const tokens = await this.getTokens(newUser.id, newUser.telefone);
      await this.updateRtHash(newUser.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Erro ao criar usuário: ' + error);
    }
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.utilizador.findUnique({
      where: {
        telefone: dto.telefone,
      },
    });

    if (!user) throw new ForbiddenException('Acesso Negado');

    if (user.estado === 'SUSPENSO')
      throw new ForbiddenException('Acesso Negado');

    const passwordMatches = await bcrypt.compare(dto.senha, user.hashPin);
    if (!passwordMatches) throw new ForbiddenException('Acesso Negado');

    const tokens = await this.getTokens(user.id, user.telefone);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.utilizador.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async getCurrentUser(userId: string) {
    const user = await this.prisma.utilizador.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nomeCompleto: true,
        email: true,
        estado: true,
        telefone: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      user,
    };
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.prisma.utilizador.findUnique({
      where: {
        id: userId,
      },
    });

    console.log('Chegou');

    if (!user || !user.hashedRt) throw new ForbiddenException('Acesso Negado');

    console.log('Passou');
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) throw new ForbiddenException('Acesso Negado!');

    const tokens = await this.getTokens(user.id, user.telefone);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.utilizador.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    userId: string,
    email: string,
    roleId: string = '',
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      id: userId,
      access_token: at,
      refresh_token: rt,
      roleId: roleId,
    };
  }

  async changePassword(userId: string, senhaAntiga: string, senhaNova: string) {
    const user = await this.prisma.utilizador.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario não encontrado...');
    }

    const passwordMatch = await bcrypt.compare(senhaAntiga, user.hashPin);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const newHashedPassword = await this.hashData(senhaNova);
    await this.prisma.utilizador.update({
      where: {
        id: userId,
      },
      data: {
        hashPin: newHashedPassword,
      },
    });
  }
}
