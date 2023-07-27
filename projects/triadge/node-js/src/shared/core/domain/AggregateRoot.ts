import { Entity } from './Entity';
import { ICreateProps } from './ICreateProps';
import { UniqueEntityID } from './UniqueEntityID';

abstract class AggregateRoot<T> extends Entity<T> {
  get id(): UniqueEntityID {
    return this._id;
  }

  public static create<T, U>(
    params: ICreateProps<U>,
    Clazz: new (props: U, id?: UniqueEntityID) => T,
  ) {
    const { props, id } = params;
    const updatedProps = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    } as U;

    const instance = new Clazz(updatedProps, id);

    return instance;
  }
}

export { AggregateRoot };
