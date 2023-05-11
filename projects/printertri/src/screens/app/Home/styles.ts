import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[700]};
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_700};
`;
