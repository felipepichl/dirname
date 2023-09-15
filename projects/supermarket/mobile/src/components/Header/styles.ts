import styled, { css } from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT_A
}))`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid ${({theme}) => theme.COLORS.PRIMARY_100};

  padding: ${getStatusBarHeight() + 33}px 20px 24px;
`;

export const Logo = styled.Text`
  font-size: 24px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const Avatar = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
`;