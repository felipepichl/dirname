import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fafafa;
  border: 1px solid #efefef;
  border-radius: 3px;
  height: 44px;
  padding: 0 15px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderColor: 'rgba(255, 255, 255, 0.8)',
})`
  flex: 1;
  font-size: 15px;
  color: #262626;
`;
