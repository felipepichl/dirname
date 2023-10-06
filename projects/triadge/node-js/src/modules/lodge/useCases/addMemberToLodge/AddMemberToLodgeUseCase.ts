import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ILodgesRepository } from '@modules/lodge/repositories/ILodgesRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  lodgeId: string
  userId: string
}

@injectable()
class AddMemberToLodgeUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('LodgesRepository')
    private lodgesRepository: ILodgesRepository,
    @inject('UsersRepository')
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

    await this.lodgesRepository.addMembersToLodge(lodgeId, userId)
  }
}

export { AddMemberToLodgeUseCase }
