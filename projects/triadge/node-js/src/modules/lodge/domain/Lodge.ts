import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

import { User } from '@prisma/client'

interface ILodgeProps {
  id?: string
  name: string
  description: string
  avatar?: string

  userId?: string
  users?: User[]
}

class Lodge extends AggregateRoot<ILodgeProps> {
  constructor(props: ILodgeProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get avatar(): string {
    return this.props.avatar
  }

  get users(): User[] {
    return this.props.users
  }

  public static createLodge({
    id,
    name,
    description,
    avatar,
    users,
  }: ILodgeProps): Lodge {
    const props = { name, description, avatar, users }

    return AggregateRoot.create({ props, id }, Lodge)
  }
}

export { Lodge }
