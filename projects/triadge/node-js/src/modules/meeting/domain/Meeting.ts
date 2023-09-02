import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

import { Attendance } from '@modules/attendance/domain/Attendance'

interface IMeetingProps {
  id?: string
  date: Date
  attendences?: Attendance[]
}

class Meeting extends AggregateRoot<IMeetingProps> {
  constructor(props: IMeetingProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get date(): Date {
    return this.props.date
  }

  get attendances(): Attendance[] {
    return this.props.attendences
  }

  public static createMeeting({
    id,
    date,
    attendences,
  }: IMeetingProps): Meeting {
    const meetingProps = {
      date,
      attendences,
    }

    return AggregateRoot.create({ props: meetingProps, id }, Meeting)
  }
}

export { Meeting }
