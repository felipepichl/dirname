import { Meeting } from '@modules/meeting/domain/Meeting'
import { MeetingRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingRepositoryInMemory'

import { FindMeetingByDate } from './FindMeetingByDate'

let meetingsRepositoryInMemory: MeetingRepositoryInMemory
let findMeetingByDate: FindMeetingByDate

describe('[Meeting] - Find meeting by date', () => {
  beforeEach(() => {
    meetingsRepositoryInMemory = new MeetingRepositoryInMemory()

    findMeetingByDate = new FindMeetingByDate(meetingsRepositoryInMemory)
  })

  it('should be able to list a meetings by date', async () => {
    const date1 = new Date(2022, 3, 16)
    const date2 = new Date(2022, 3, 19)

    const meeting1 = Meeting.createMeeting({
      date: date1,
    })

    const meeting2 = Meeting.createMeeting({
      date: date2,
    })

    await meetingsRepositoryInMemory.create(meeting1)
    await meetingsRepositoryInMemory.create(meeting2)

    const result = await findMeetingByDate.execute({
      date: date1,
    })

    console.log(result)

    // expect(meetings).toHaveLength(2)
  })
})
