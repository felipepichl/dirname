import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAllLodgesUseCase } from '@modules/lodge/useCases/listAllLodges/ListAllLodgesUseCase'

class ListAllLodgesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = container.resolve(ListAllLodgesUseCase)

    const result = await useCase.execute()

    return response.status(200).json(result)
  }
}

export { ListAllLodgesController }
