import { Router } from 'express';

import appointmentRouter from './appointment.routes';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const router = Router();

router.use('/appointments', appointmentRouter);
router.use('/users', userRouter);
router.use('/sessions', sessionsRouter);

export default router;
