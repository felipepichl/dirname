import React from 'react';

import { Input } from '@components/Input'

import { Container, Content, Title } from './styles';

export function SignIn() {
  return (
    <Container>
      <Content>

      <Title>Login</Title>

      <Input 
        placeholder='E-mail'
        type='secondary'
        autoCorrect={false}
        autoCapitalize='none'
        // onChangeText={setEmail}
      />

      <Input 
        placeholder='Senha'
        type='secondary'
        secureTextEntry
        // onChangeText={setPassword}
      />
      </Content>
    </Container>
  )
}