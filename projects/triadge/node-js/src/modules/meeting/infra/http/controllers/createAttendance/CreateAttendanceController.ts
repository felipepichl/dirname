import { CreateAttendanceUseCase } from '@modules/attendance/useCases/createAttendance/CreateAttendanceUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateAttendanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { date } = request.body

    const createAttendanceUseCase = container.resolve(CreateAttendanceUseCase)

    await createAttendanceUseCase.execute({
      date,
    })

    return response.status(201).json({ message: 'Attendance created' })
  }
}

export { CreateAttendanceController }
