import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Home, Search, Notifications, Profile } from './styles';

import home from '~/assets/home.svg';
import search from '~/assets/search.svg';
import add from '~/assets/add.svg';
import notifications from '~/assets/like.svg';
import profile from '~/assets/profile.svg';

export default function Footer() {
  return (
    <Container>
      <Link to="/">
        <Home src={home} />
      </Link>
      <Link to="/">
        <Search src={search} />
      </Link>
      <Link to="/post">
        <img src={add} alt="Add" />
      </Link>
      <Link to="/">
        <Notifications src={notifications} />
      </Link>
      <Link to="/">
        <Profile src={profile} />
      </Link>
    </Container>
  );
}
