import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-top: 1px solid #ddd;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 769px) {
    justify-content: space-between;
    padding: 0 15px 0 15px;
  }

  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const Home = styled.img`
  display: none;
  @media screen and (max-width: 769px) {
    display: block;
  }
`;

export const Search = styled.img`
  display: none;
  @media screen and (max-width: 769px) {
    display: block;
  }
`;

export const Notifications = styled.img`
  display: none;
  @media screen and (max-width: 769px) {
    display: block;
  }
`;

export const Profile = styled.img`
  display: none;
  @media screen and (max-width: 769px) {
    display: block;
  }
`;
