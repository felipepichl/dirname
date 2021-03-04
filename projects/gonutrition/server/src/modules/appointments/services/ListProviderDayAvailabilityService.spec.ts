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
      date: new Date(2021, 2, 13, 14, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 13, 15, 0, 0),
      provider_id: 'provider',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 13, 12).getTime();
    });

    const availability = await listProviderDayAvalability.execute({
      provider_id: 'provider',
      year: 2021,
      month: 3,
      day: 13,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
