import { Router } from 'express'

import { CreateMeetingController } from '../controllers/createMeeting/CreateMeetingController'
import { ListAllMeetingController } from '../controllers/listAllMeeting/ListAllMeetingController'

const meetingsRouter = Router()

const createMeetingController = new CreateMeetingController()
const listAllMeetingController = new ListAllMeetingController()

meetingsRouter.post('', createMeetingController.handle)
meetingsRouter.get('', listAllMeetingController.handle)

export { meetingsRouter }
