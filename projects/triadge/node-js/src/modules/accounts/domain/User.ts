import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';

interface IUserProps {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  phoneNumber: string;
  role: string;
  level: string;
  fk_lodge_id: string;
  fk_address_id: string;
  startDate: Date;
}

class User extends AggregateRoot<IUserProps> {
  constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get avatar(): string {
    return this.props.avatar;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get role(): string {
    return this.props.role;
  }

  get level(): string {
    return this.props.level;
  }

  get fk_lodge_id(): string {
    return this.props.fk_lodge_id;
  }

  get fk_address_id(): string {
    return this.props.fk_address_id;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  public static createUser({
    name,
    email,
    password,
    avatar,
    phoneNumber,
    role,
    level,
    fk_lodge_id,
    fk_address_id,
    startDate,
  }: IUserProps): User {
    const userProps = {
      name,
      email,
      password,
      avatar,
      phoneNumber,
      role,
      level,
      fk_lodge_id,
      fk_address_id,
      startDate,
    };

    return AggregateRoot.create({ props: userProps }, User);
  }

  public updateAvatar(avatar: string): void {
    this.props.avatar = avatar;
  }
}

export { User };
