import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';

interface IUserTokensProps {
  user_id: string;
  expires_date?: Date;
  refresh_token?: string;
}

class UserTokens extends AggregateRoot<IUserTokensProps> {
  constructor(props: IUserTokensProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get user_id(): string {
    return this.props.user_id;
  }

  get expires_date(): Date {
    return this.props.expires_date;
  }

  get refresh_token(): string {
    return this.props.refresh_token;
  }

  public static createUserTokens({
    user_id,
    expires_date,
    refresh_token,
  }: IUserTokensProps): UserTokens {
    const userTokensProps = {
      user_id,
      expires_date,
      refresh_token,
    };

    return AggregateRoot.create({ props: userTokensProps }, UserTokens);
  }
}

export { UserTokens };
