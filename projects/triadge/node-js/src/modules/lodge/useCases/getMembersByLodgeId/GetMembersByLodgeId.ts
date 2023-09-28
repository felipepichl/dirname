import { User } from '@modules/accounts/domain/User'
import { ILodgesRepository } from '@modules/lodge/repositories/ILodgesRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  lodgeId: string
}

interface IResponse {
  users: User[]
}

class GetMembersByLodgeId implements IUseCase<IRequest, IResponse> {
  constructor(private lodgesRepository: ILodgesRepository) {}

  execute({ lodgeId }: IRequest): Promise<IResponse> {
    throw new Error('Method not implemented.')
  }
}

export { GetMembersByLodgeId }
