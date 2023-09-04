import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

import { Attendance } from '@modules/attendance/domain/Attendance'

interface IMeetingProps {
  id?: string
  date: Date
  attendances?: Attendance[]
}

class Meeting extends AggregateRoot<IMeetingProps> {
  constructor(props: IMeetingProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get date(): Date {
    return this.props.date
  }

  get attendances(): Attendance[] {
    return this.props.attendances
  }

  public static createMeeting({
    id,
    date,
    attendances,
  }: IMeetingProps): Meeting {
    const meetingProps = {
      date,
      attendances,
    }

    return AggregateRoot.create({ props: meetingProps, id }, Meeting)
  }
}

export { Meeting }
