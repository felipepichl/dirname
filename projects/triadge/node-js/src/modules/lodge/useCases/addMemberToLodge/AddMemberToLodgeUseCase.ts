import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ILodgesRepository } from '@modules/lodge/repositories/ILodgesRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  lodgeId: string
  userId: string
}

class AddMemberToLodgeUseCase implements IUseCase<IRequest, void> {
  constructor(
    private lodgesRepository: ILodgesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ lodgeId, userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const lodge = await this.lodgesRepository.findById(lodgeId)

    if (!lodge) {
      throw new AppError('Lodge not found', 404)
    }

    await this.lodgesRepository.addMembersToLodge()
  }
}

export { AddMemberToLodgeUseCase }
