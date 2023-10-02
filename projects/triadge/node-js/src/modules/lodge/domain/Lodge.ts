import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

import { User } from '@modules/accounts/domain/User'

interface ILodgeProps {
  id?: string
  name: string
  avatar?: string
  latitude?: number
  longitude?: number
  foundingDate: Date
  isActive: boolean

  adminUserId?: string
  admin?: User

  members?: User[]
}

class Lodge extends AggregateRoot<ILodgeProps> {
  constructor(props: ILodgeProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get foundingDate(): Date {
    return this.props.foundingDate
  }

  get isActive(): boolean {
    return this.props.isActive
  }

  get avatar(): string {
    return this.props.avatar
  }

  get members(): User[] {
    return this.props.members
  }

  public static createLodge({
    id,
    name,
    avatar,
    foundingDate,
    isActive,
    members,
  }: ILodgeProps): Lodge {
    const props = { name, foundingDate, isActive, avatar, members }

    return AggregateRoot.create({ props, id }, Lodge)
  }
}

export { Lodge }
