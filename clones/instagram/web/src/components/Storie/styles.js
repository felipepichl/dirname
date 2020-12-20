import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100px;
  width: 600px;
  max-width: 680px;
  padding: 3px;
  margin: 92px 0 20px 0;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;

  display: flex;

  overflow-x: scroll;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 600px) {
    margin: 72px 0 0 0;
    border: none;
    border-bottom: 1px solid #ddd;
    width: 100%;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 2px solid #fafafa;
      position: absolute;
    }
  }

  /* max-width: 80px;
  min-width: 80px;
  margin: 5px; */

  /* div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 70px;
    height: 70px;
    padding: 3px;
    border-radius: 50%;
    background-image: linear-gradient(45deg, #ff0, #f00, #90c);
    margin-bottom: 5px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #fafafa;
    }
  } */
`;
