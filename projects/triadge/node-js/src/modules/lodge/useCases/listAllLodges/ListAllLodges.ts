import { inject, injectable } from 'tsyringe'

import { Lodge } from '@modules/lodge/domain/Lodge'
import { ILodgesRepository } from '@modules/lodge/repositories/ILodgesRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'

interface IResponse {
  lodges: Lodge[]
}

@injectable()
class ListAllLodges implements IUseCase<void, IResponse> {
  constructor(
    @inject('LodgesRepository')
    private lodgesRepository: ILodgesRepository,
  ) {}

  async execute(): Promise<IResponse> {
    const lodges = await this.lodgesRepository.findAll()

    return {
      lodges,
    }
  }
}

export { ListAllLodges }
