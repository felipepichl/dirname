import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListPatientsService from './ListPatientsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

let listPatients: ListPatientsService;

describe('ListPatients', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listPatients = new ListPatientsService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the patients', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: 'hash123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'jonhtre@example.com',
      password: 'hash123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'jonhqua@example.com',
      password: 'hash123',
    });

    const patients = await listPatients.execute({
      user_id: loggedUser.id,
    });

    expect(patients).toEqual([user1, user2]);
  });
});
