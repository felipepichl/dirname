import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateAttendance } from '@modules/attendance/useCases/createAttendance/CreateAttendance'

class CreateAttendanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userIds, meetingId } = request.body

    const createMeetingAttendance = container.resolve(CreateAttendance)

    await createMeetingAttendance.execute({
      userIds,
      meetingId,
    })

    return response.status(201).json({ message: 'Attendance created' })
  }
}

export { CreateAttendanceController }
