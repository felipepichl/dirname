import { User } from '@modules/accounts/domain/User'
import { Meeting } from '@modules/meeting/domain/Meeting'

import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface IAttendanceProps {
  id?: string
  userIds: string[]
  user?: User[]
  meetingId: string
  meeting?: Meeting
}

class Attendance extends AggregateRoot<IAttendanceProps> {
  constructor(props: IAttendanceProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get user(): User[] {
    return this.props.user
  }

  get userIds(): string[] {
    return this.props.userIds
  }

  get meeting(): Meeting {
    return this.props.meeting
  }

  get meetingId(): string {
    return this.props.meetingId
  }

  static createAttendance({
    id,
    userIds,
    meetingId,
    meeting,
  }: IAttendanceProps): Attendance {
    const attendancesProps = {
      userIds,
      meetingId,
      meeting,
    }

    return AggregateRoot.create({ props: attendancesProps, id }, Attendance)
  }
}

export { Attendance }
