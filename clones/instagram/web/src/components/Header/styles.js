import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  width: 100%;
  height: 72px;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 769px) {
    justify-content: center;

    input,
    aside {
      display: none;
    }
  }

  nav {
    margin-left: 15px;
  }

  input {
    width: 250px;
    min-width: 250px;
    height: 28px;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 5px;
    font-size: 16px;
    background-color: #fafafa;

    ::-webkit-input-placeholder {
      text-align: center;
    }
  }

  aside {
    align-items: center;
    a {
      margin: 15px;
    }
  }
`;

export const Logo = styled.img`
  height: 40px;

  @media screen and (max-width: 769px) {
    display: none;
  }
`;

export const LogoMobile = styled.img`
  height: 40px;
  display: none;

  @media screen and (max-width: 769px) {
    display: block;
  }
`;
