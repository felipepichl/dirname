import { ComponentProps } from 'react'
import { IconBaseProps } from 'react-icons'

import { ButtonContainer } from './styles'

export interface ButtonInputProps
  extends ComponentProps<typeof ButtonContainer> {
  title: string
  icon?: React.ComponentType<IconBaseProps>
}

export function Button({ title, icon: Icon, ...props }: ButtonInputProps) {
  return (
    <ButtonContainer {...props}>
      {Icon && <Icon size={20} />}
      {title}
    </ButtonContainer>
  )
}
