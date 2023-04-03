import { getUserThunk, googleAuthThunk } from '../redux/auth/authOperations';

const googleAuthCred = searchParams => {
  const user = {};
  if (searchParams.get('accessToken')) {
    user.accessToken = searchParams.get('accessToken');
  }
  if (searchParams.get('refreshToken')) {
    user.refreshToken = searchParams.get('refreshToken');
  }
  if (searchParams.get('sid')) {
    user.sid = searchParams.get('sid');
  }
  return user;
};

export const googleAuth = (token, searchParams, dispatch, navigate) => {
  !token &&
    googleAuthCred(searchParams).accessToken &&
    dispatch(googleAuthThunk(googleAuthCred(searchParams)))
      .unwrap()
      .then(() => dispatch(getUserThunk()))
      .then(() => {
        navigate('/');
      });
};
