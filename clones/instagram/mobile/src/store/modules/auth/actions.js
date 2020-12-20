export function signInRequest(email) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(email, name, username) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { email, name, username },
  };
}

export function signInFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
