import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { FindMeetingByDate } from '@modules/meeting/useCases/findMeetingByDate/FindMeetingByDate'

class FindMeetingByDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const dateParams = request.query.date as string
    const date = new Date(dateParams)

    const findMeetingByDate = container.resolve(FindMeetingByDate)

    console.log('Log => ', dateParams)

    const meeting = await findMeetingByDate.execute({
      date,
    })

    return response.json(meeting)
  }
}

export { FindMeetingByDateController }
