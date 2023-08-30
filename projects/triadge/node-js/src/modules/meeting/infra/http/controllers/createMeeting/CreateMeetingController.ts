import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateMeetingUseCase } from '@modules/meeting/useCases/createMeeting/CreateMeetingUseCase'

class CreateMeetingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { date } = request.body

    const createMettingUseCase = container.resolve(CreateMeetingUseCase)

    await createMettingUseCase.execute({
      date,
    })

    return response.status(201).json({ message: 'Meeting created' })
  }
}

export { CreateMeetingController }
