import { ComponentProps } from 'react'
import { TextInputContainer, Input } from './styles'

export type TextInputProps = ComponentProps<typeof Input>

export function TextInput({ ...props }: TextInputProps) {
  return (
    <TextInputContainer>
      <Input {...props} />
    </TextInputContainer>
  )
}
