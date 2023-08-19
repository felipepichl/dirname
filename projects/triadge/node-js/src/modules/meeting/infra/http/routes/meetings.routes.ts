import { Router } from 'express'

import { CreateMeetingAttendanceController } from '../controller/createMeetingAttendance/CreateMeetingAttendanceController'

const meetingRoutes = Router()

const createMeetingAttendanceController =
  new CreateMeetingAttendanceController()

meetingRoutes.post('', createMeetingAttendanceController.handle)

export { meetingRoutes }
