import { Router } from 'express'

import { CreateAttendanceController } from '../controllers/createAttendance/CreateAttendanceController'
import { ListAllAttendancesController } from '../controllers/listAllAttendances/ListAllAttendancesController'

const attendancesRouter = Router()

const createAttendanceController = new CreateAttendanceController()
const listAllAttendancesController = new ListAllAttendancesController()

attendancesRouter.post('', createAttendanceController.handle)
attendancesRouter.get('', listAllAttendancesController.handle)

export { attendancesRouter }
