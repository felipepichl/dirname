import styled, { css } from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

// export const Container = styled(LinearGradient).attrs(({ theme }) => ({
//   colors: theme.COLORS.GRADIENT_A
// }))`
export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid ${({theme}) => theme.COLORS.PRIMARY_100};
  background-color: ${({theme}) => theme.COLORS.TEST};;

  padding: ${getStatusBarHeight() + 33}px 20px 24px;
`;

export const Brand = styled.Image`
  width: 70px;
  height: 70px;
`;

export const Avatar = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
`;