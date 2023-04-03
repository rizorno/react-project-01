import React from 'react';
import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';
import css from './authorization.module.scss';

const Authorization = ({ type }) => {
  return (
    <div className={css['auth-container']}>
      <div className={css['auth-logo']} />
      <AuthorizationForm type={type} />
    </div>
  );
};

export default Authorization;
