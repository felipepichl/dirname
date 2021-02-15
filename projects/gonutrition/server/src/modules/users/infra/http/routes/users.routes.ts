import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  usersController.update,
);

export default usersRouter;
