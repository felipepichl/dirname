import '@modules/accounts/providers';
import './providers';

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AttendanceRepository } from '@modules/attendance/infra/prisma/repositories/AttendanceRepository';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';
import { MeetingsAttendancesRepository } from '@modules/meeting/infra/prisma/repositories/MeetingsAttendancesRepository';
import { IMeetingsAttendancesRepository } from '@modules/meeting/repositories/IMeetingsAttendancesRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IAttendanceRepository>(
  'AttendanceRepository',
  AttendanceRepository,
);

container.registerSingleton<IMeetingsAttendancesRepository>(
  'MeetingsAttendancesRepository',
  MeetingsAttendancesRepository,
);
