import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';

interface IUserTokensProps {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}

class UserTokens extends AggregateRoot<IUserTokensProps> {
  constructor(props: IUserTokensProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get user_id(): string {
    return this.user_id;
  }

  get expires_date(): Date {
    return this.expires_date;
  }

  get refresh_token(): string {
    return this.refresh_token;
  }

  public static createUserTokens({
    user_id,
    expires_date,
    refresh_token,
  }: IUserTokensProps): UserTokens {
    const props = {
      user_id,
      expires_date,
      refresh_token,
    };

    return AggregateRoot.create({ props }, UserTokens);
  }
}

export { UserTokens };
