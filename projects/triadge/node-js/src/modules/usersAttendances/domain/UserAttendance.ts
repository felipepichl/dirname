import { User } from '@modules/accounts/domain/User';
import { Attendance } from '@modules/attendance/domain/Attendance';

import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';

interface IUserAttendanceProps {
  id?: string;
  user_ids: string[];
  user?: User[];
  attendance_id: string;
  attendance?: Attendance;
}

class UserAttendance extends AggregateRoot<IUserAttendanceProps> {
  constructor(props: IUserAttendanceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get user(): User[] {
    return this.props.user;
  }

  get user_ids(): string[] {
    return this.props.user_ids;
  }

  get attendances(): Attendance {
    return this.props.attendance;
  }

  get attendance_id(): string {
    return this.props.attendance_id;
  }

  static createUserAttendance({
    id,
    user_ids,
    attendance_id,
  }: IUserAttendanceProps): UserAttendance {
    const userAttendancesProps = {
      user_ids,
      attendance_id,
    };

    return AggregateRoot.create(
      { props: userAttendancesProps, id },
      UserAttendance,
    );
  }
}

export { UserAttendance };
