import { User } from '@modules/accounts/domain/User';
import { Attendance } from '@modules/attendance/domain/Attendance';

import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';

interface IUserAttendanceProps {
  id?: string;
  user_id: string;
  user?: User;
  attendance_id: string;
  attendance?: Attendance;
}

class UserAttendances extends AggregateRoot<IUserAttendanceProps> {
  constructor(props: IUserAttendanceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get user(): User {
    return this.props.user;
  }

  get attendances(): Attendance {
    return this.props.attendance;
  }

  static createUserAttendance({
    id,
    user_id,
    attendance_id,
  }: IUserAttendanceProps): UserAttendances {
    const userAttendancesProps = {
      user_id,
      attendance_id,
    };

    return AggregateRoot.create(
      { props: userAttendancesProps, id },
      UserAttendances,
    );
  }
}

export { UserAttendances };
