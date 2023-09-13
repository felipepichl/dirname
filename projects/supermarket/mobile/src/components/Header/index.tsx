import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Easing } from 'react-native-reanimated'
import { MotiView } from 'moti'

import { ButtonBack } from '@components/ButtonBack'

import { Container, Logo, Avatar } from './styles'

type Props = {
  title?: string
}

export function Header({ title }: Props) {
  return (
    <MotiView
      from={{ translateY: -100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
    >
      <Container>
        <ButtonBack />

        <Logo>{title}</Logo>
          
          <TouchableOpacity>
            <Avatar>Deletar</Avatar>
          </TouchableOpacity>
      </Container>
    </MotiView>
  )
}
