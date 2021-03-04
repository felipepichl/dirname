// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderMonthAvalability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvalability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 9, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 10, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 11, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 12, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 13, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 14, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 15, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 16, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 17, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 14, 8, 0, 0),
      provider_id: 'provider',
    });

    const availability = await listProviderMonthAvalability.execute({
      provider_id: 'provider',
      month: 3,
      year: 2021,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 12, available: true },
        { day: 13, available: false },
        { day: 14, available: true },
        { day: 15, available: true },
      ]),
    );
  });
});
