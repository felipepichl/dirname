import { inject, injectable } from 'tsyringe'

import { User } from '@modules/accounts/domain/User'
import { Lodge } from '@modules/lodge/domain/Lodge'
import { ILodgesRepository } from '@modules/lodge/repositories/ILodgesRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  lodgeId: string
}

interface IResponse {
  lodge: Lodge
  members: User[]
}

@injectable()
class GetMembersByLodgeId implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('LodgesRepository')
    private lodgesRepository: ILodgesRepository,
  ) {}

  async execute({ lodgeId }: IRequest): Promise<IResponse> {
    const lodge = await this.lodgesRepository.findById(lodgeId)

    if (!lodge) {
      throw new AppError('Lodge not found', 404)
    }

    const members = await this.lodgesRepository.getMembersByLodgeId(lodgeId)

    return {
      lodge,
      members,
    }
  }
}

export { GetMembersByLodgeId }
