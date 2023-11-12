import React, { ComponentProps } from 'react'
import { TextInputContainer, Input } from './styles'

import { IconBaseProps } from 'react-icons'

export interface TextInputProps extends ComponentProps<typeof Input> {
  icon?: React.ComponentType<IconBaseProps>
}

export function TextInput({ icon: Icon, ...props }: TextInputProps) {
  return (
    <TextInputContainer>
      {Icon && <Icon size={20} />}
      <Input {...props} />
    </TextInputContainer>
  )
}
