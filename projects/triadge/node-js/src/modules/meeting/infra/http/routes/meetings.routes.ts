import { Router } from 'express'

import { CreateMeetingController } from '../controllers/createMeeting/CreateMeetingController'
import { ListAllMeetingController } from '../controllers/listAllMeeting/ListAllMeetingController'
import { FindMeetingByDateController } from '../controllers/findMeetingByDate/FindMeetingByDateController'

const meetingsRouter = Router()

const createMeetingController = new CreateMeetingController()
const listAllMeetingController = new ListAllMeetingController()
const findMeetingByDateController = new FindMeetingByDateController()

meetingsRouter.post('', createMeetingController.handle)
meetingsRouter.get('', listAllMeetingController.handle)
meetingsRouter.get('/by-date', findMeetingByDateController.handle)

export { meetingsRouter }
