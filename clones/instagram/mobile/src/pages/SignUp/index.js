import React, { useRef, useState } from 'react';

import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { signUpRequest } from '~/store/modules/auth/actions';

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
  SignIn,
  SignInText,
  Footer,
  FooterText,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const fullnameRef = useRef();
  const usernameRef = useRef();

  function handleSubmit() {
    dispatch(signUpRequest(email, name, username));
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
            returnKeyType="next"
            onSubmitEditing={() => fullnameRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Full name"
            ref={fullnameRef}
            returnKeyType="next"
            onSubmitEditing={() => usernameRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Username"
            ref={usernameRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={username}
            onChangeText={setUsername}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Sign up
          </SubmitButton>
        </Form>

        <Separator>
          <Line />
          <TextSeparator>OR</TextSeparator>
        </Separator>

        <SignLink>
          <SignLinkText>Have an account?</SignLinkText>
          <SignIn onPress={() => navigation.navigate('SignIn')}>
            <SignInText>Sign In.</SignInText>
          </SignIn>
        </SignLink>
      </Content>
      <Footer>
        <FooterText>Instagram from Facebook</FooterText>
      </Footer>
    </Container>
  );
}
