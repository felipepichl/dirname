import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';

interface IAttendanceProps {
  id?: string;
  date: Date;
}

class Attendance extends AggregateRoot<IAttendanceProps> {
  constructor(props: IAttendanceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get date(): Date {
    return this.props.date;
  }

  public static createAttendance({ id, date }: IAttendanceProps): Attendance {
    const attendanceProps = {
      date,
    };

    return AggregateRoot.create({ props: attendanceProps, id }, Attendance);
  }
}

export { Attendance };
