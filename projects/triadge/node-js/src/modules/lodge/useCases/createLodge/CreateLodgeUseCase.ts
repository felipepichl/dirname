import { inject, injectable } from 'tsyringe'

import { Lodge } from '@modules/lodge/domain/Lodge'
import { ILodgesRepository } from '@modules/lodge/repositories/ILodgesRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  name: string
  foundingDate: Date
  isActive: boolean
}

@injectable()
class CreateLodgeUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('LodgesRepository')
    private lodgesRepository: ILodgesRepository,
  ) {}

  async execute({ name, foundingDate, isActive }: IRequest): Promise<void> {
    const lodgeAlreadyExists = await this.lodgesRepository.searchByName(name)

    if (lodgeAlreadyExists) {
      throw new AppError('Lodge already exists', 400)
    }

    const lodge = Lodge.createLodge({
      name,
      foundingDate,
      isActive,
    })

    await this.lodgesRepository.create(lodge)
  }
}

export { CreateLodgeUseCase }
