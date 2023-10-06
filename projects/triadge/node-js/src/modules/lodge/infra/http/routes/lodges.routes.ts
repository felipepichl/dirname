import { Router } from 'express'

import { CreateLoadgeController } from '../controller/createLodge/CreateLoadgeController'
import { ListAllLodgesController } from '../controller/listAllLodges/ListAllLodgesController'
import { GetMembersByLodgeIdController } from '../controller/getMembersByLodgeId/GetMembersByLodgeIdController'
import { AddMemberToLodgeController } from '../controller/addMemberToLodge/AddMemberToLodgeController'

const lodgesRouter = Router()

const createLoadgeController = new CreateLoadgeController()
const listAllLodgesController = new ListAllLodgesController()
const getMembersByLodgeIdController = new GetMembersByLodgeIdController()
const addMemberToLodgeController = new AddMemberToLodgeController()

lodgesRouter.post('', createLoadgeController.handle)
lodgesRouter.get('', listAllLodgesController.handle)
lodgesRouter.get('/:id/members', getMembersByLodgeIdController.handle)
lodgesRouter.post('/:id/members', addMemberToLodgeController.handle)

export { lodgesRouter }
