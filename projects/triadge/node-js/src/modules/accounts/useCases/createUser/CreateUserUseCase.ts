import { User } from '@modules/accounts/domain/User';
import { IHashProvider } from '@modules/accounts/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  phoneNumber: string;
  role: string;
  level: string;
  fk_lodge_id: string;
  fk_address_id: string;
  startDate: Date;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
    avatar,
    phoneNumber,
    role,
    level,
    fk_lodge_id,
    fk_address_id,
    startDate,
  }: IRequest): Promise<void> {
    const userAllReadyExists = await this.usersRepository.findByEmail(email);

    if (userAllReadyExists) {
      throw new AppError('Users already exists', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = User.createUser({
      name,
      email,
      password: hashedPassword,
      avatar,
      phoneNumber,
      role,
      level,
      fk_lodge_id,
      fk_address_id,
      startDate,
    });

    await this.usersRepository.create(user);
  }
}

export { CreateUserUseCase };
