import { IUseCase } from '@shared/core/domain/IUseCase'

import { ILodgesRepository } from '@modules/lodge/repositories/ILodgesRepository'
import { AppError } from '@shared/error/AppError'
import { Lodge } from '@modules/lodge/domain/Lodge'

interface IRequest {
  name: string
}

class CreateLodgeUseCase implements IUseCase<IRequest, void> {
  constructor(private lodgesRepository: ILodgesRepository) {}

  async execute({ name }: IRequest): Promise<void> {
    const lodgeAlreadyExists = await this.lodgesRepository.searchByName(name)

    if (lodgeAlreadyExists) {
      throw new AppError('Logde already exists', 400)
    }

    const lodge = Lodge.createLodge({
      name,
      description: '',
    })

    await this.lodgesRepository.create(lodge)
  }
}

export { CreateLodgeUseCase }