import { Alert } from 'react-native';
import { takeLatest, call, put, all, delay } from 'redux-saga/effects';

import { signInSuccess, signInFailure } from './actions';

// import history from '~/services/history';
import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { email } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield delay(3000);

    yield put(signInSuccess(token, user));

    // history.push('/feed');
  } catch (error) {
    Alert.alert('Erro no login', 'Verifique seus dados');
    yield put(signInFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { email, name, username } = payload;

    yield call(api.post, 'users', {
      email,
      name,
      username,
    });

    // history.push('/');
  } catch (error) {
    Alert.alert('Erro no cadastro', 'Verifique seus dados');
    yield put(signInFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
