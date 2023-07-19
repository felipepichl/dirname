import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      phoneNumber,
      role,
      level,
      fk_lodge_id,
      fk_address_id,
      startDate,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      phoneNumber,
      role,
      level,
      fk_lodge_id,
      fk_address_id,
      startDate,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
