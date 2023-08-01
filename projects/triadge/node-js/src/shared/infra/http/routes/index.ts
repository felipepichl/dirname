import { authenticateRoutes } from '@modules/accounts/infra/http/routes/authenticate.routes';
import { usersRouter } from '@modules/accounts/infra/http/routes/users.routes';
import { attendancesRouter } from '@modules/attendance/infra/http/routes/attendances.routes';
import { Router } from 'express';

const router = Router();

router.use('/users', usersRouter);

router.use(authenticateRoutes);

router.use(attendancesRouter);

export { router };
