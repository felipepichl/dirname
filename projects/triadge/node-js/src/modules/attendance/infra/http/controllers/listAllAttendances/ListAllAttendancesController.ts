import { ListAllAttendancesUseCase } from '@modules/attendance/useCases/listAllAttendances/ListAllAttendancesUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListAllAttendancesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllAttendancesUseCase = container.resolve(
      ListAllAttendancesUseCase,
    );

    const result = listAllAttendancesUseCase.execute();

    return response.json(result);
  }
}

export { ListAllAttendancesController };
