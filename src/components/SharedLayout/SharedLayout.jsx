import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from 'redux/auth/authOperations';
import { getIsLogin, getUserEmail } from 'redux/auth/authSelectors';
import ModalHeader from 'components/ModalHeader/ModalHeader';
import { ReactComponent as ReactLogo } from 'images/logo-header.svg';
import css from './shared-layout.module.scss';

const SharedLayout = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
  const isLogin = useSelector(getIsLogin);

  useEffect(() => {
    const closeModalHeader = ({ code }) => {
      if (code === 'Escape' && openModal) {
        setOpenModal(!openModal);
      }
    };
    window.addEventListener('keydown', closeModalHeader);
    return () => {
      window.removeEventListener('keydown', closeModalHeader);
    };
  }, [openModal]);

  const openModalHeader = () => {
    setOpenModal(!openModal);
  };

  const closeModalHeader = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setOpenModal(!openModal);
    }
  };

  const logoutConfirm = () => {
    dispatch(logoutThunk());
    setOpenModal(!openModal);
  };

  return (
    <>
      <header>
        <div className={css['header-container']}>
          <Link to="/">
            <ReactLogo />
          </Link>

          {isLogin && (
            <div className={css['header-exit']}>
              <p className={css['header-userName']}>{email[0].toUpperCase()}</p>
              <p className={css['header-userEmail']}>{email}</p>
              <button
                className={css['header-buttonLogout']}
                onClick={openModalHeader}
              >
                Exit
              </button>
            </div>
          )}
        </div>

        {openModal && (
          <ModalHeader
            closeModalHeader={closeModalHeader}
            logoutConfirm={logoutConfirm}
          />
        )}
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
