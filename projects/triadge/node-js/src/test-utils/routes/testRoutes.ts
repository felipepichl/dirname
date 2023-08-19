import express, { Request, Response } from 'express'
import { setupUser } from '../helpers/testHelpers'

const testRoutes = express.Router()

testRoutes.post('/setupUser', async (request: Request, response: Response) => {
  const user = await setupUser(request.body)

  return response.json(user)
})

export { testRoutes }
