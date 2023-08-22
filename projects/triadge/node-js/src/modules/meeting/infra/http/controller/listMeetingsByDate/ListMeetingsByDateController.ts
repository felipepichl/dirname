import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListMeetingsByDate } from '@modules/meeting/useCases/listMeetingsByDate/ListMeetingsByDate'

class ListMeetingsByDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { date } = request.body

    const listMeetingsByDate = container.resolve(ListMeetingsByDate)

    const result = await listMeetingsByDate.execute(date)

    return response.status(200).json(result)
  }
}

export { ListMeetingsByDateController }
