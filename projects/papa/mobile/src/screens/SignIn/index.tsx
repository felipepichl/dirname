import React, { useState } from 'react';

import brandImg from '@assets/brand.png';

import { useAuth } from '@src/hooks/auth';

import { Input } from '@components/Input';

import { 
  Container, 
  Content, 
  BrandContainer, 
  Brand, 
  Title 
} from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signIn, forgotPassword, isLogging } = useAuth();

  function handleSignIn() {
    signIn(email, password);
  }
  
  return (
    <Container>
      <Content>

      <BrandContainer>
        <Brand 
          source={brandImg}
        />
      </BrandContainer>

      <Title>Login</Title>

      <Input 
        placeholder='E-mail'
        type='secondary'
        autoCorrect={false}
        autoCapitalize='none'
        onChangeText={setEmail}
      />

      <Input 
        placeholder='Senha'
        type='secondary'
        secureTextEntry
        onChangeText={setPassword}
      />
      </Content>
    </Container>
  )
}