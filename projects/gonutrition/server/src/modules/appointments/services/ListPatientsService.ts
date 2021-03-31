import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

// import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListPatientsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recovery<User[]>(
      `patients-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllPatients({
        except_user_id: user_id,
      });

      console.log('Database');

      await this.cacheProvider.save(
        `patients-list:${user_id}`,
        classToClass(users),
      );
    }

    return users;
  }
}

export default ListPatientsService;
