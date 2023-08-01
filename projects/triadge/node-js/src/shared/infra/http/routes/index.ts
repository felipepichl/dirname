import { authenticateRoutes } from '@modules/accounts/infra/http/routes/authenticate.routes';
import { usersRouter } from '@modules/accounts/infra/http/routes/users.routes';
import { attendancesRouter } from '@modules/attendance/infra/http/routes/attendances.routes';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();

router.use('/users', usersRouter);

router.use('/sessions', authenticateRoutes);

router.use(ensureAuthenticated);
router.use('/attendances', attendancesRouter);

export { router };
