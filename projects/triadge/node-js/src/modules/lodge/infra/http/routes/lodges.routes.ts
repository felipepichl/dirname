import { Router } from 'express'

import { CreateLoadgeController } from '../controller/createLodge/CreateLoadgeController'
import { ListAllLodgesController } from '../controller/listAllLodges/ListAllLodgesController'
import { GetMembersByLodgeIdController } from '../controller/getMembersByLodgeId/GetMembersByLodgeIdController'

const lodgesRouter = Router()

const createLoadgeController = new CreateLoadgeController()
const listAllLodgesController = new ListAllLodgesController()
const getMembersByLodgeIdController = new GetMembersByLodgeIdController()

lodgesRouter.post('', createLoadgeController.handle)
lodgesRouter.get('', listAllLodgesController.handle)
lodgesRouter.get('/:id/members', getMembersByLodgeIdController.handle)

export { lodgesRouter }
