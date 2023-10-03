import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetMembersByLodgeId } from '@modules/lodge/useCases/getMembersByLodgeId/GetMembersByLodgeId'

class GetMembersByLodgeIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: lodgeId } = request.params

    const useCase = container.resolve(GetMembersByLodgeId)

    const result = await useCase.execute({
      lodgeId,
    })

    return response.status(200).json(result)
  }
}

export { GetMembersByLodgeIdController }
