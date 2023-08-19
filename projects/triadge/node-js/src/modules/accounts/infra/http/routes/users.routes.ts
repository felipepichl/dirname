import { uploadConfig } from '@config/upload'
import { Router } from 'express'
import multer from 'multer'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

import { CreateUserController } from '../controllers/createUser/CreateUserController'
import { UploadUserAvatarController } from '../controllers/updateUserAvatar/UploadUserAvatarController'

const usersRouter = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const uploadUserAvatarController = new UploadUserAvatarController()

usersRouter.post('', createUserController.handle)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  uploadUserAvatarController.handle,
)

export { usersRouter }
