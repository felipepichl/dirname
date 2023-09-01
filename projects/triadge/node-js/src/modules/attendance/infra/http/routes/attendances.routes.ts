import { Router } from 'express'

import { CreateAttendanceController } from '../controller/createAttendance/CreateAttendanceController'

const attendancesRouter = Router()

const createAttendanceController = new CreateAttendanceController()

attendancesRouter.post('', createAttendanceController.handle)

export { attendancesRouter }
