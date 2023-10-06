import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AddMemberToLodgeUseCase } from '@modules/lodge/useCases/addMemberToLodge/AddMemberToLodgeUseCase'

class AddMemberToLodgeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      params: { lodgeId },
      body: { userId },
    } = request

    const useCase = container.resolve(AddMemberToLodgeUseCase)

    await useCase.execute({
      lodgeId,
      userId,
    })

    return response
      .status(201)
      .send({ message: 'User added to the lodge successfully.' })
  }
}

export { AddMemberToLodgeController }
