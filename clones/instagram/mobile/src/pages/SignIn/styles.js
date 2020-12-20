import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: Platform.OS === 'ios',
  // behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-bottom: 20px;
`;

export const Separator = styled.View`
  margin-top: 45px;
  align-self: stretch;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Line = styled.View`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: #999;
  width: 100%;
`;

export const TextSeparator = styled.Text`
  color: #999;
  padding: 20px;
  position: absolute;
  background-color: #fff;
`;

export const SignLink = styled.View`
  margin-top: 45px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
export const SignLinkText = styled.Text`
  font-size: 16px;
  color: #999;
`;

export const SignUp = styled.TouchableOpacity`
  margin-left: 5px;
`;

export const SignUpText = styled.Text`
  font-size: 16px;
  color: #3897f0;
`;

export const Footer = styled.View`
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: #999;
  height: 80px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled.Text`
  font-size: 16px;
  color: #999;
`;
