import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const List = styled.ul`
  list-style: none;

  li {
    margin-bottom: 30px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;

  background: #282828;
  border: 1px solid #666;
  margin-top: 30px;

  :hover {
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25), 0 0 0.7em 0 #419bd5;
  }
  a {
    text-decoration: none;
  }

  span {
    content: '';
    border-top: solid 0.88px rgba(255, 255, 255, 0.25);
    width: 10em;
    display: block;
    margin: 0 auto 0 auto;
    opacity: 0.2;
  }
`;

export const Thumbnail = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export const Title = styled.h1`
  padding: 5px 5px 0 5px;
  color: #ddd;
  font-size: 2em;
  font-weight: 700;
  line-height: 1.5;

  @media screen and (max-width: 736px) {
    font-size: 1.2em;
  }
`;

export const Post = styled.h1`
  padding: 0 5px 1em 5px;
  padding-bottom: 1em;
  font-size: 10px;
  color: #666;
`;

export const Description = styled.div`
  padding: 1em 2em;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(Link)`
  background-color: transparent;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.15), 0 0 0.2em 0;

  color: #ddd;
  width: 140px;
  border: 0;
  height: 2.85em;
  line-height: 2.95em;
  padding: 0 1.5em;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;

  font-weight: 900;
  font-size: 1.35em;
  font-family: Signika, sans-serif;

  @media screen and (max-width: 736px) {
    width: 100%;
  }

  :hover {
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.15), 0 0 0.2em 0 #419bd5;
  }
`;

export const Back = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  position: fixed;
  z-index: 2;
  top: -150%;
  left: 0;
  display: block;

  transition: 350ms;

  ${Button}:focus & {
    top: 0;
  }
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 640px;
  max-height: 640px;
  background: #282828;
  border: 1px solid #666;
  margin: 115px auto 0 auto;

  @media screen and (max-width: 736px) {
    margin: 80px auto 80px auto;
    font-size: 0.9em;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.7em;
  }

  p {
    align-items: center;
    padding: 20px;
    text-align: justify;
    white-space: normal;
    line-height: normal;
  }
  span {
    content: '';
    border-top: solid 0.88px rgba(255, 255, 255, 0.25);
    width: 10em;
    display: block;
    margin: 0 auto 0 auto;
    opacity: 0.2;
    padding: 1px;
  }
`;

export const ModalFooter = styled.div`
  padding: 20px;
`;

export const ExitButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #666;
  background-color: transparent;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.15), 0 0 0.2em 0 #419bd5;
  color: #ddd;
  font-weight: 900;
  font-size: 1em;
  font-family: Signika, sans-serif;
  cursor: pointer;

  :hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;
