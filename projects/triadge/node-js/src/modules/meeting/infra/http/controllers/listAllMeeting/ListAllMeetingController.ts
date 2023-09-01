import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAllMeeting } from '@modules/meeting/useCases/listAllMeeting/ListAllMeeting'

class ListAllMeetingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllMeeting = container.resolve(ListAllMeeting)

    const meetings = await listAllMeeting.execute()

    return response.status(200).json({ meetings })
  }
}

export { ListAllMeetingController }
