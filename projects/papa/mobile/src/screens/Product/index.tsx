import React from 'react'
import { Platform, TouchableOpacity } from 'react-native'

import { ButtonBack } from '@components/ButtonBack'

import { 
  Container,
  Header,
  Title,
  DeleteLable 
} from './styles'

export function Product() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack />

        <Title>Cadastrar</Title>
          
          <TouchableOpacity>
            <DeleteLable>Deletar</DeleteLable>
          </TouchableOpacity>
      </Header>
    </Container>
  )
}