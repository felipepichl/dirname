import { Router } from 'express'

import { CreateLoadgeController } from '../controller/createLodge/CreateLoadgeController'

const lodgesRouter = Router()

const createLoadgeController = new CreateLoadgeController()

lodgesRouter.post('', createLoadgeController.handle)

export { lodgesRouter }
