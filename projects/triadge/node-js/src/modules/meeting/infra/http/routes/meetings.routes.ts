import { Router } from 'express'

import { CreateMeetingAttendanceController } from '../controller/createMeetingAttendance/CreateMeetingAttendanceController'
import { ListMeetingsByDateController } from '../controller/listMeetingsByDate/ListMeetingsByDateController'

const meetingRoutes = Router()

const createMeetingAttendanceController =
  new CreateMeetingAttendanceController()

const listMeetingsByDateController = new ListMeetingsByDateController()

meetingRoutes.post('', createMeetingAttendanceController.handle)
meetingRoutes.get('', listMeetingsByDateController.handle)

export { meetingRoutes }
