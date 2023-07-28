import { IUseCase } from '@shared/core/domain/IUseCase';

interface IRequest {
  date: Date;
  isPresent: boolean;
  user_id: string;
}

class CreateAttendanceUseCase implements IUseCase<IRequest, void> {
  execute({ date, isPresent, user_id }: IRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { CreateAttendanceUseCase };
