import { Router } from 'express'

import { authenticateRoutes } from '@modules/accounts/infra/http/routes/authenticate.routes'
import { usersRouter } from '@modules/accounts/infra/http/routes/users.routes'
import { attendancesRouter } from '@modules/attendance/infra/http/routes/attendances.routes'
import { meetingsRouter } from '@modules/meeting/infra/http/routes/meetings.routes'
import { lodgesRouter } from '@modules/lodge/infra/http/routes/lodges.routes'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

// import {} from '@tests/'

const routes = Router()

routes.use('/users', usersRouter)

routes.use('/sessions', authenticateRoutes)

routes.use(ensureAuthenticated)

routes.use('/meetings', meetingsRouter)
routes.use('/attendances', attendancesRouter)
routes.use('/lodges', lodgesRouter)

// if (process.env.NODE_ENV === 'test') {
//   const testRoutes = require('../../../test-utils/routes/testRoutes');
//   routes.use('/test', testRoutes);
// }

export { routes }
