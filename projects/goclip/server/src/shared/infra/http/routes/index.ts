import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/sessions', sessionsRouter);
router.use('/password', passwordRouter);
router.use('/profile', profileRouter);

export default router;
