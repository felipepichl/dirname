import { Router } from 'express';

import appointmentRouter from '@modules/appointments/infra/http/routes/appointment.routes';
import patientsRouter from '@modules/appointments/infra/http/routes/patients.routes';
import providerRouter from '@modules/appointments/infra/http/routes/providers.routes';

import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const router = Router();

router.use('/appointments', appointmentRouter);
router.use('/patients', patientsRouter);

router.use('/users', userRouter);
router.use('/sessions', sessionsRouter);
router.use('/password', passwordRouter);
router.use('/profile', profileRouter);
router.use('/provider', providerRouter);

export default router;
