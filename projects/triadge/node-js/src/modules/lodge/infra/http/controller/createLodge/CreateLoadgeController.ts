import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateLodgeUseCase } from '@modules/lodge/useCases/createLodge/CreateLodgeUseCase'

class CreateLoadgeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, foundingDate, isActive } = request.body

    const createLodgeUseCase = container.resolve(CreateLodgeUseCase)

    await createLodgeUseCase.execute({
      name,
      foundingDate,
      isActive,
    })

    return response.status(201).json({ message: 'Lodge created' })
  }
}

export { CreateLoadgeController }
