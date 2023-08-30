import { CreateMeetingAttendance } from '@modules/meeting/useCases/createMeetingAttendance/CreateMeetingAttendance'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateMeetingAttendanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userIds, attendanceId } = request.body

    const createMeetingAttendance = container.resolve(CreateMeetingAttendance)

    await createMeetingAttendance.execute({
      userIds,
      attendanceId,
    })

    return response.status(201).json({ message: 'Meeting created' })
  }
}

export { CreateMeetingAttendanceController }