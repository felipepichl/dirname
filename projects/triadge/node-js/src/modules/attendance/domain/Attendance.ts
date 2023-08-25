import { User } from '@modules/accounts/domain/User'
import { Attendance } from '@modules/attendance/domain/Attendance'

import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface IMeetingAttendanceProps {
  id?: string
  userIds: string[]
  user?: User[]
  attendanceId: string
  attendance?: Attendance
}

class MeetingAttendance extends AggregateRoot<IMeetingAttendanceProps> {
  constructor(props: IMeetingAttendanceProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get user(): User[] {
    return this.props.user
  }

  get userIds(): string[] {
    return this.props.userIds
  }

  get attendances(): Attendance {
    return this.props.attendance
  }

  get attendanceId(): string {
    return this.props.attendanceId
  }

  static createMeetingAttendance({
    id,
    userIds,
    attendanceId,
    attendance,
  }: IMeetingAttendanceProps): MeetingAttendance {
    const meetingAttendancesProps = {
      userIds,
      attendanceId,
      attendance,
    }

    return AggregateRoot.create(
      { props: meetingAttendancesProps, id },
      MeetingAttendance,
    )
  }
}

export { MeetingAttendance }
