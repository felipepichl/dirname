import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { date, user_id } = request.body;
    const provider_id = request.user.id;
    /**
     * In my case the provider is who will create a appointmnet.
     */

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
