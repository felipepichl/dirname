import styled, { css } from 'styled-components/native'
import { TextInput } from 'react-native'

export const Container = styled.View`
  width: 100%;
  height: 56px;
  border: 1px solid ${({ theme }) => theme.COLORS.SHAPE};
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_900};
  border-radius: 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const Size = styled.View`
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.COLORS.SHAPE};
  margin-right: 18px;
`;

export const Label = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.PRIMARY_50};
  `}
`;

export const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.SECONDARY_900 
}))`
  flex: 1;
  margin-left: 7px;
  color: ${({ theme }) => theme.COLORS.PRIMARY_50};
`;


