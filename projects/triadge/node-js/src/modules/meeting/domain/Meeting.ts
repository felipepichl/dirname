import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface IMeetingProps {
  id?: string
  date: Date
}

class Meeting extends AggregateRoot<IMeetingProps> {
  constructor(props: IMeetingProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get date(): Date {
    return this.props.date
  }

  public static createMeeting({ id, date }: IMeetingProps): Meeting {
    const meetingProps = {
      date,
    }

    return AggregateRoot.create({ props: meetingProps, id }, Meeting)
  }
}

export { Meeting }
