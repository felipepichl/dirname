import { User } from '@modules/accounts/domain/User';
import { User as RawUser } from '@prisma/client';

import { IMapper } from '@shared/core/infra/Mapper';

class UserMappers implements IMapper<User, RawUser> {
  toPersistence(object: User): User {
    return object;
  }

  toDomain(raw: RawUser): User {
    return User.createUser(raw);
  }

  getMapper(): IMapper<User, RawUser> {
    return UserMappers.getMapper();
  }

  static getMapper(): UserMappers {
    return new UserMappers();
  }
}

export { UserMappers };
