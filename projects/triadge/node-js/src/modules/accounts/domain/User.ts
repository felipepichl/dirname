import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface IUserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  phoneNumber: string;
  isPresent: boolean;
  role: string;
  level: string;
  lodge: string;
  address: string;
  startDate: Date;
  createdAt?: Date
  updatedAt?: Date
}

class User extends AggregateRoot<IUserProps> {
  constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get avatar(): string {
    return this.props.avatar
  }

  public static createUser({
    name,
    email,
    password,
    avatar,
    phoneNumber,
    isPresent,
    role,
    level,
    lodge,
    address,
    startDate,
    createdAt,
    updatedAt,
  }: IUserProps): User {
    const userProps = {
      name,
      email,
      password,
      avatar,
      phoneNumber,
      isPresent,
      role,
      level,
      lodge,
      address,
      startDate,
      createdAt,
      updatedAt,
    }

    return AggregateRoot.create({ props: userProps }, User)
  }
}

export { User }
