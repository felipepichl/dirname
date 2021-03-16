import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 14, 0, 0),
      provider_id: 'provider',
      user_id: 'patient',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 15, 0, 0),
      provider_id: 'provider',
      user_id: 'patient',
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2021,
      month: 3,
      day: 13,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
