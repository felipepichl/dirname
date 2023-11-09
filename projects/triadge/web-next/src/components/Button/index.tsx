import { ComponentProps } from 'react'
import { ButtonContainer } from './styles'

export interface ButtonInputProps
  extends ComponentProps<typeof ButtonContainer> {
  title: string
}

export function Button({ title, ...props }: ButtonInputProps) {
  return <ButtonContainer {...props}>{title}</ButtonContainer>
}
