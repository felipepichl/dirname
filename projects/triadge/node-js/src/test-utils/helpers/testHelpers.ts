import { User } from '@modules/accounts/domain/User'
import { UserMappers } from '@modules/accounts/infra/prisma/mappers/UserMappers'
import { PrismaSingleton } from '@shared/infra/prisma'

export const setupUser = async ({
  name,
  email,
  password,
  phoneNumber,
}: User): Promise<User> => {
  const result = await PrismaSingleton.getInstance().user.create({
    data: {
      name,
      email,
      password,
      phoneNumber,
    },
  })

  return UserMappers.getMapper().toDomain(result)
}
