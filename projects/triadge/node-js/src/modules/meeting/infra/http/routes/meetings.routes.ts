import { Router } from 'express'

import { CreateMeetingController } from '../controllers/createMeeting/CreateMeetingController'

const meetingsRouter = Router()

const createMeetingController = new CreateMeetingController()

meetingsRouter.post('', createMeetingController.handle)

export { meetingsRouter }
