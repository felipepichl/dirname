import { User } from '@modules/accounts/domain/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { IUseCase } from '@shared/core/domain/IUseCase';

interface IRequest {
  user_ids: string[];
}

interface IResponse {
  users: User[];
}

class FindUserByIdsUseCase implements IUseCase<IRequest, IResponse> {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ user_ids }: IRequest): Promise<IResponse> {
    const users = await this.usersRepository.findByIds(user_ids);

    return {
      users,
    };
  }
}

export { FindUserByIdsUseCase };
