import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('utilizadores')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*async registar(req: Request, res: Response) {
    try {
      const { nomeCompleto, telefone, pin } = req.body;
      if (!nomeCompleto || !telefone || !pin) {
        return res.status(400).json({ erro: 'Campos obrigatórios em falta.' });
      }
      const utilizador = await utilizadorService.registar({
        nomeCompleto,
        telefone,
        pin,
      });
      return res
        .status(201)
        .json({
          mensagem: 'Utilizador registado com sucesso',
          utilizadorId: utilizador.id,
        });
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { telefone, pin } = req.body;
      const utilizador = await utilizadorService.autenticar(telefone, pin);
      return res
        .status(200)
        .json({
          mensagem: 'Autenticado com sucesso',
          utilizadorId: utilizador.id,
        });
    } catch (error: any) {
      return res.status(401).json({ erro: error.message });
    }
  }*/

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
