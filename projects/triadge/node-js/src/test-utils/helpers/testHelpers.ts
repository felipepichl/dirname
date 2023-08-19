import { User } from '@modules/accounts/domain/User';
import { PrismaSingleton } from '@shared/infra/prisma';

export const setupUser = async ({name, email, password, phoneNumber}: User) => {
  //  const user: User = await PrismaSingleton.getInstance().user.create(data)
}
