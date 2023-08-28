import { Router } from 'express'

import { CreateMeetingController } from '../controllers/createAttendance/CreateMeetingController'

const meetingsRouter = Router()

const createMeetingController = new CreateMeetingController()

meetingsRouter.post('', createMeetingController.handle)

export { meetingsRouter }
