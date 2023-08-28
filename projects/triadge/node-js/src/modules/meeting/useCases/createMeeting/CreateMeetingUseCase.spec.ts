import { Meeting } from '@modules/meeting/domain/Meeting'
import { MeetingRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingRepositoryInMemory'

import { CreateMeetingUseCase } from './CreateMeetingUseCase'

let meetingRepositoryInMemory: MeetingRepositoryInMemory
let createMeetingUseCase: CreateMeetingUseCase

describe('[Meeting] - Create a Meeting', () => {
  beforeEach(() => {
    meetingRepositoryInMemory = new MeetingRepositoryInMemory()

    createMeetingUseCase = new CreateMeetingUseCase(meetingRepositoryInMemory)
  })

  it('should be able to create a new meeting', async () => {
    const meeting = Meeting.createMeeting({
      date: new Date(),
    })

    await createMeetingUseCase.execute(meeting)

    const meetingCreated = await meetingRepositoryInMemory.findAll()

    expect(meetingCreated.length).toBeGreaterThan(0)
    expect(meetingCreated[0].date).toEqual(meeting.date)
  })
})
