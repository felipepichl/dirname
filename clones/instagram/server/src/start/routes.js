import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';

/**
 * Controllers
 */
import SessionController from '../app/controllers/SessionController';
import UserController from '../app/controllers/UserController';
import FileController from '../app/controllers/FileController';
import PostController from '../app/controllers/PostController';
import LikeController from '../app/controllers/LikeController';

import authMiddleware from '../app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * Routes
 */

/**
 * Auth, Session
 */
routes.post('/sessions', SessionController.store);

/**
 * Create a new user.
 */
routes.post('/users', UserController.store);

/**
 * Auth Middlewares
 */
routes.use(authMiddleware);

/**
 * Users
 */
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);

/**
 * Files / Avatar
 */
routes.post('/files', upload.single('file'), FileController.store);

/**
 * Posts
 */
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

/**
 * Likes
 */
routes.post('/likes/:id', LikeController.toggle);

export default routes;
