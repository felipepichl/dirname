import styled, { css } from 'styled-components/native';

import { Button } from '@components/Button';

type InputGroupProps = {
  isPriceGroup: boolean;
}


export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_400};
`;

export const Content = styled.ScrollView``;

export const CenteredContainer = styled.View`
  flex: 1;
  flex-direction: column; 
  padding-bottom: 24px;  // Adiciona um padding no fundo
`;

export const Form = styled.View`
  width: 100%;
  padding: 24px;
  flex-wrap: wrap; // Isso faz com que os itens dentro do form se envolvam quando necessário
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  width: 90%;
  align-self: center;
  margin: 16px 0;
`;



export const Label = styled.Text`
  margin-bottom: 12px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
  font-weight: bold;
`;

export const InputGroup = styled.View<InputGroupProps>`
  width: 100%;
  margin-bottom: 16px;
  padding-bottom: ${({ isPriceGroup }) => (isPriceGroup ? "8px" : "0")};
`;

export const InputGroupHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MaxCaracters = styled.Text`
  font-size: 10px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
  font-weight: bold;
`;
