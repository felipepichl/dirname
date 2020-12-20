import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0 5px 0 5px;
`;

export const Content = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;

  width: 600px;
  max-width: 600px;

  @media screen and (max-width: 450px) {
    border: none;
    background: #fafafa;
  }

  input {
    background: #fafafa;
    border: 1px solid #efefef;
    border-radius: 3px;
    height: 44px;
    padding: 0 15px;
    color: #262626;
    margin: 10px 0 0;
    width: 100%;

    @media screen and (max-width: 450px) {
      background: #fff;
    }
  }

  button {
    margin: 10px 0 0;
    height: 44px;
    background: #3897f0;
    font-weight: bold;
    color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
  }
`;

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border-radius: 4px;
  padding: 50px;
  text-align: center;
  background: #fafafa;
  border: 1px dashed #ddd;
  cursor: pointer;

  input {
    display: none;
  }

  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};

  @media screen and (max-width: 450px) {
    background: #fff;
  }
`;

const messageColor = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5',
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageColor[props.type || 'default']};
  justify-content: center;
  align-items: center;
`;
