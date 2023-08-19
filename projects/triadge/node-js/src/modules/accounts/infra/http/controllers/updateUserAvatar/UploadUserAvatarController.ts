import { UploadUserAvatarUseCase } from '@modules/accounts/useCases/uploadUserAvatar/UploadUserAvatarUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UploadUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filename: avatar_file } = request.file
    const { id: user_id } = request.user

    const uploadUserAvatarUseCase = container.resolve(UploadUserAvatarUseCase)

    await uploadUserAvatarUseCase.execute({
      avatar_file,
      user_id,
    })

    return response.status(204).send()
  }
}

export { UploadUserAvatarController }
