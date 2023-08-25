import { Meeting } from './Meeting'

describe('[Meeting] - Create a new Meeting', () => {
  it('should be able to create a new instance of meeting', () => {
    const meeting = Meeting.createMeeting({
      date: new Date(),
    })

    expect(meeting instanceof Meeting).toBe(true)
    expect(meeting).toBeTruthy()
  })
})
