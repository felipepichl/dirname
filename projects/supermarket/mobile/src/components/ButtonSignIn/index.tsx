import React from 'react'

import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { TouchableOpacityProps } from 'react-native'

import { Container } from './styles'

export function ButtonSignIn({...rest }: TouchableOpacityProps) {
  const { COLORS } = useTheme()

  return (
    <Container {...rest}>
      <AntDesign name='login' size={22} color={COLORS.SECONDARY_900} />
    </Container>
  ) 
}