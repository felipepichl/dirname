import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  background: #fafafa;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 450px) {
    background-color: #fff;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;

  > div {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 1px;
    margin: 0 0 10px;
    padding: 20px;
    text-align: center;

    @media screen and (max-width: 450px) {
      border: none;
    }

    img {
      height: 55px;
      width: 175px;
      margin: 20px 0 10px;
    }

    h2 {
      font-weight: 600;
      line-height: 20px;
      font-size: 17px;

      color: #999;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      input {
        background: #fafafa;
        border: 1px solid #efefef;
        border-radius: 3px;
        height: 44px;
        padding: 0 15px;
        color: #262626;
        margin: 0 0 10px;
      }

      span {
        color: #f64c75;
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
      }

      button {
        margin: 5px 0 0;
        height: 44px;
        background: #3897f0;
        font-weight: bold;
        color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        font-size: 16px;
      }
    }
  }

  footer {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 1px;
    margin: 0 0 10px;
    padding: 20px;

    @media screen and (max-width: 450px) {
      border: none;
    }

    p {
      color: #262626;
      font-size: 14px;
      margin: 15px;
      text-align: center;
    }

    a {
      color: #3897f0;
      font-weight: bold;
    }
  }
`;
