import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Content,
  Form,
  FormInput,
  SubmitButton,
  Separator,
  Line,
  TextSeparator,
  SignLink,
  SignLinkText,
  SignUp,
  SignUpText,
  Footer,
  FooterText,
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email));
  }

  return (
    <Container>
      <Content>
        <Image source={logo} />

        <Form>
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Your email"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={email}
            onChangeText={setEmail}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Log in
          </SubmitButton>
        </Form>

        <Separator>
          <Line />
          <TextSeparator>OR</TextSeparator>
        </Separator>

        <SignLink>
          <SignLinkText>Don't have an account?</SignLinkText>
          <SignUp onPress={() => navigation.navigate('SignUp')}>
            <SignUpText>Sign up.</SignUpText>
          </SignUp>
        </SignLink>
      </Content>
      <Footer>
        <FooterText>Instagram from Facebook</FooterText>
      </Footer>
    </Container>
  );
}
