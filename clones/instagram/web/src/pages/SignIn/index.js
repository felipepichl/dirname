import React from 'react';
import LoadingButton from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';
import loadingAnimation from '~/assets/buttonAnimated.json';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email }) {
    dispatch(signInRequest(email));
  }

  return (
    <>
      <div>
        <img src={logo} alt="Instaclone" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="email" type="text" placeholder="Your email" />

          <button type="submit">
            {loading ? (
              <LoadingButton
                options={{
                  animationData: loadingAnimation,
                  loop: true,
                  autoplay: true,
                }}
                height={40}
                width={40}
              />
            ) : (
              'Log in'
            )}
          </button>
        </Form>
      </div>

      <footer>
        <p>
          {' '}
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </footer>
    </>
  );
}
