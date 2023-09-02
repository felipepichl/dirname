import '@modules/accounts/providers'
import './providers'

import { container } from 'tsyringe'

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IMeetingRepository } from '@modules/meeting/repositories/IMeetingRepository'
import { MeetingRepository } from '@modules/meeting/infra/prisma/repositories/MeetingRepository'
import { AttendancesRepository } from '@modules/attendance/infra/prisma/repositories/AttendancesRepository'
import { IAttendancesRepository } from '@modules/attendance/repositories/IAttendancesRepository'
// import { MeetingsAttendancesRepository } from '@modules/meeting/infra/prisma/repositories/MeetingsAttendancesRepository'
// import { IMeetingsAttendancesRepository } from '@modules/meeting/repositories/IMeetingsAttendancesRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
)

container.registerSingleton<IAttendancesRepository>(
  'AttendancesRepository',
  AttendancesRepository,
)

container.registerSingleton<IMeetingRepository>(
  'MeetingsRepository',
  MeetingRepository,
)
