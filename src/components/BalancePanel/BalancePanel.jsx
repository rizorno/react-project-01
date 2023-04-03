import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserBalance } from 'redux/auth/authSelectors';
import { getBalance } from 'redux/user/userSelectors';
import ModalBalance from 'components/ModalBalance/ModalBalance';
import css from './balance-panel.module.scss';

const BalancePanel = () => {
  const [openModalBalance, setOpenModalBalance] = useState(false);
  const balanceAuth = useSelector(getUserBalance);
  const balanceUser = useSelector(getBalance);
  const location = useLocation();

  useEffect(() => {
    const closeModalBalance = ({ code }) => {
      if (code === 'Escape' && openModalBalance) {
        setOpenModalBalance(!openModalBalance);
      }
    };
    window.addEventListener('keydown', closeModalBalance);
    return () => {
      window.removeEventListener('keydown', closeModalBalance);
    };
  }, [openModalBalance]);

  const btnOpenModalBalance = () => {
    setOpenModalBalance(!openModalBalance);
  };

  const closeModalBalance = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setOpenModalBalance(!openModalBalance);
    }
  };

  const currentBalance = balanceUser === null ? balanceAuth : balanceUser;

  return (
    <>
      {(location.pathname === '/' ||
        location.pathname === '/expenses' ||
        location.pathname === '/incomes') && (
        <section className={css['balance-section']}>
          <div className={css['balance-wrapper']}>
            <p className={css['balance-title']}>Balance:</p>
            <div className={css['balance-boxAdd']}>
              <p className={css['balance-value']}>
                {currentBalance?.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'UAH',
                  currencyDisplay: 'code',
                  useGrouping: true,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                {balanceAuth === 0 && (
                  <span
                    data="You can't spend money until you have it :)"
                    className={css.balanceClue2}
                  >
                    <span
                      data-title="Hello! To get started, enter the current balance of your account!"
                      className={css.balanceClue}
                    >
                      _
                    </span>
                  </span>
                )}
              </p>
              <button
                onClick={btnOpenModalBalance}
                className={css['balance-btnAdd']}
              >
                New balance
              </button>
            </div>
          </div>

          {openModalBalance && (
            <ModalBalance closeModalBalance={closeModalBalance} />
          )}
        </section>
      )}

      {location.pathname === '/reports' && (
        <div className={css['boxReport']}>
          <p className={css['titleReport']}>Balance:</p>

          <p className={css['valueReport']}>
            {currentBalance?.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'UAH',
              currencyDisplay: 'code',
              useGrouping: true,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {balanceAuth === 0 && (
              <span
                data="You can't spend money until you have it :)"
                className={css['noteReports']}
              >
                <span
                  data-title="Hello! To get started, enter the current balance of your account!"
                  className={css['messageReport']}
                >
                  _
                </span>
              </span>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default BalancePanel;
