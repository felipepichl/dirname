import { Router } from 'express'

import { CreateLoadgeController } from '../controller/createLodge/CreateLoadgeController'
import { ListAllLodgesController } from '../controller/listAllLodges/ListAllLodgesController'

const lodgesRouter = Router()

const createLoadgeController = new CreateLoadgeController()
const listAllLodgesController = new ListAllLodgesController()

lodgesRouter.post('', createLoadgeController.handle)
lodgesRouter.get('', listAllLodgesController.handle)

export { lodgesRouter }
