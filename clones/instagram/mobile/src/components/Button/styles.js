import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 44px;
  background: #3897f0;
  border-radius: 4px;

  /* border: 1px solid transparent; */

  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
