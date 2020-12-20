import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
  name: Yup.string().required('name is required'),
  username: Yup.string().required('Username is required'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ email, name, username }) {
    dispatch(signUpRequest(email, name, username));
  }

  return (
    <>
      <div>
        <img src={logo} alt="Instaclone" />

        <h2>Sign up to see photos and videos from your friends.</h2>

        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="email" type="text" placeholder="Email" />
          <Input name="name" type="text" placeholder="Fullname" />
          <Input name="username" type="text" placeholder="Username" />

          <button type="submit">Sign up</button>
        </Form>
      </div>

      <footer>
        <p>
          {' '}
          Have an account? <Link to="/">Log in</Link>
        </p>
      </footer>
    </>
  );
}
