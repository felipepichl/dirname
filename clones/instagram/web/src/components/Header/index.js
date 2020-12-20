import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@rocketseat/unform';

import { Container, Logo, LogoMobile } from './styles';

import logo from '~/assets/logo-feed.svg';
import logoMobile from '~/assets/logo.svg';
import discovery from '~/assets/discovery.svg';
import notifications from '~/assets/like.svg';
import profile from '~/assets/profile.svg';

export default function Header() {
  return (
    <Container>
      <nav>
        <Link to="/">
          <Logo src={logo} />
          <LogoMobile src={logoMobile} />
        </Link>
      </nav>

      <Input name="search" placeholder="Search" />

      <aside>
        <Link to="/">
          <img src={discovery} alt="Perfil" />
        </Link>
        <Link to="/">
          <img src={notifications} alt="Perfil" />
        </Link>
        <Link to="/">
          <img src={profile} alt="Perfil" />
        </Link>
      </aside>
    </Container>
  );
}
