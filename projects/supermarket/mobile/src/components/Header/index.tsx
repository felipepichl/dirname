import React from 'react'

import { Easing } from 'react-native-reanimated'
import { MotiView } from 'moti'

import brandImage from '@assets/brand.png'

import { ButtonSignIn } from '@components/ButtonSignIn'

import { Container, Brand } from './styles'

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

        <Brand 
          source={brandImage}
        />

        <ButtonSignIn />
      </Container>
    </MotiView>
  )
}
