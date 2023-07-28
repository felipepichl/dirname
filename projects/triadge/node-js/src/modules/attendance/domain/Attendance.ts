import { User } from '@modules/accounts/domain/User';

import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';

interface IAttendanceProps {
  id?: string;
  date: Date;
  isPresent: boolean;
  user_id: string;
  user: User;
}

class Attendance extends AggregateRoot<IAttendanceProps> {
  constructor(props: IAttendanceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get date(): Date {
    return this.props.date;
  }

  get isPresent(): boolean {
    return this.props.isPresent;
  }

  get user_id(): string {
    return this.props.user_id;
  }

  get user(): User {
    return this.props.user;
  }

  public static createAttendance({
    id,
    date,
    isPresent,
    user_id,
    user,
  }: IAttendanceProps): Attendance {
    const attendanceProps = {
      date,
      isPresent,
      user_id,
      user,
    };

    return AggregateRoot.create({ props: attendanceProps, id }, Attendance);
  }
}

export { Attendance };
