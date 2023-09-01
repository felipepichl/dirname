import { Meeting } from '@modules/meeting/domain/Meeting'
import { MeetingRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingRepositoryInMemory'

import { ListAllMeeting } from './ListAllMeeting'

let meetingsRepositoryInMemory: MeetingRepositoryInMemory
let listAllMeeting: ListAllMeeting

describe('[Meeting] - List all meetings', () => {
  beforeEach(() => {
    meetingsRepositoryInMemory = new MeetingRepositoryInMemory()

    listAllMeeting = new ListAllMeeting(meetingsRepositoryInMemory)
  })

  it('should be able to list all meetings', async () => {
    const meeting1 = Meeting.createMeeting({
      date: new Date(2022, 3, 16),
    })

    const meeting2 = Meeting.createMeeting({
      date: new Date(2022, 3, 19),
    })

    await meetingsRepositoryInMemory.create(meeting1)
    await meetingsRepositoryInMemory.create(meeting2)

    const { meetings } = await listAllMeeting.execute()

    expect(meetings).toHaveLength(2)
  })
})
