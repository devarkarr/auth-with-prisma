import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserProvider } from '../providers/create-user/create-user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.createUserProvider.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) throw new BadRequestException("Email doesn't exist");
    return user;
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findOneByGoogleId(id: string) {
    return await this.usersRepository.findOne({
      where: {
        googleId: id,
      },
    });
  }
}
