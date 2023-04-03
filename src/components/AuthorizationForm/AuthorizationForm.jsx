import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginThunk, signUpThunk } from 'redux/auth/authOperations';
import { getIsLogin } from 'redux/auth/authSelectors';
import SharedButton from 'commons/sharedButton/SharedButton';
import { validate } from 'helpers/authValidate';
import { useFormik } from 'formik';
import css from './authorization-form.module.scss';

const AuthorizationForm = ({ type }) => {
  const formType = { SIGNUP: 'signup', LOGIN: 'login' };
  const isLogin = useSelector(getIsLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const buttonLogin = () => navigate('/login');
  const buttonRegister = () => navigate('/register');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      switch (type) {
        case formType.LOGIN:
          dispatch(loginThunk(values))
            .unwrap()
            .then(() => formik.resetForm());
          break;
        case formType.SIGNUP:
          dispatch(signUpThunk(values))
            .unwrap()
            .then(() => formik.resetForm());
          break;
        default:
          return null;
      }
    },
  });

  return (
    <div className={css['authFormBox']}>
      <div className={css['authFormBtnBox']}>
        <SharedButton
          className={css['btnLogin']}
          onClick={buttonLogin}
          active={pathname === '/login'}
        >
          Log in
        </SharedButton>
        <SharedButton
          onClick={buttonRegister}
          active={pathname === '/register'}
        >
          Registration
        </SharedButton>
      </div>
      {type === formType.LOGIN && (
        <div className={css['googleLoginBox']}>
          <p className={css['authFormText']}>
            You can log in with your Google Account:
          </p>
          <a href="https://kapusta-backend.goit.global/auth/google">
            <SharedButton className={css['googleLoginBtn']} type="button">
              <div className={css['googleLogo']} />
              Google
            </SharedButton>
          </a>
          <p className={css['authFormText']}>
            Or log in using an email and password
          </p>
        </div>
      )}
      {type === formType.SIGNUP && (
        <p className={css['authFormText']}>
          You can sign up with your email and password:
        </p>
      )}
      <form className={css['authForm']} onSubmit={formik.handleSubmit}>
        <label htmlFor="email">
          <span>*</span>Email:
        </label>
        <input
          onBlur={formik.handleBlur}
          className={css['authFormInput']}
          placeholder="your@email.com"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p className={css['requiredText']}>{formik.errors.email}</p>
        )}
        <label htmlFor="password">
          <span>*</span>Password
        </label>
        <input
          onBlur={formik.handleBlur}
          className={css['authFormInput']}
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <p className={css['requiredText']}>{formik.errors.password}</p>
        )}
        <SharedButton
          disabled={isLogin}
          className={css['authFormSubmitBtn']}
          type="submit"
        >
          {type === formType.LOGIN ? 'Login' : 'Join'}
        </SharedButton>
      </form>
    </div>
  );
};

AuthorizationForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AuthorizationForm;
