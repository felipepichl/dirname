import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Logo } from './styles';

import logo from '../../assets/images/logo.png';

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <Logo src={logo} />
      </Link>
    </Container>
  );
}
