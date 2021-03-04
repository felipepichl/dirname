// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderDayAvalability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvalability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 9, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 11, 0, 0),
      provider_id: 'provider',
    });

    const availability = await listProviderDayAvalability.execute({
      provider_id: 'provider',
      month: 3,
      year: 2021,
      day: 13,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 9, available: false },
        { hour: 10, available: true },
        { hour: 11, available: false },
        { hour: 12, available: true },
      ]),
    );
  });
});
