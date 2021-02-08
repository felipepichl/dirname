import { Router } from 'express';

import appointmentRouter from './appointment.routes';
import userRouter from './users.routes';

const router = Router();

router.use('/appointments', appointmentRouter);
router.use('/users', userRouter);

export default router;
