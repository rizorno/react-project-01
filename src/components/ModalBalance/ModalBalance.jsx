import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { updateBalanceThunk } from 'redux/user/userOperations';
import SharedButton from 'commons/sharedButton/SharedButton';
import css from './modal-balance.module.scss';

const ModalBalance = ({ closeModalBalance }) => {
  const [openModal, setOpenModal] = useState(false);
  const [balance, setBalance] = useState('');
  const dispatch = useDispatch();

  const balanceChange = e => {
    const { value } = e.target;
    setBalance(value);
  };

  const onSubmitConfirm = e => {
    //  e.preventDefault();
    const newBalance = balance;
    dispatch(updateBalanceThunk({ newBalance }));
    setBalance('');
    setOpenModal(!openModal);
  };

  const template = (
    <div className={css['overlay']} onClick={closeModalBalance}>
      <div className={css['modal-balance']}>
        <form
          action=""
          onSubmit={onSubmitConfirm}
          onKeyPress={e => {
            e.code === 'Enter' && onSubmitConfirm();
          }}
          className={css['modal-form']}
        >
          <label>
            <button
              onClick={closeModalBalance}
              className={css['modal-btnClose']}
            />
            <p className={css['modal-title']}>Your new balance:</p>
            <input
              className={css['modal-input']}
              type="text"
              name="balance"
              autoFocus
              autoComplete="off"
              placeholder="Please, enter your new balance..."
              value={balance}
              onChange={balanceChange}
            />
          </label>
          <SharedButton type="submit" className={css['modal-btn']}>
            Confirm
          </SharedButton>
        </form>
      </div>
    </div>
  );
  return !openModal ? (
    createPortal(template, document.getElementById('modal'))
  ) : (
    <></>
  );
};

export default ModalBalance;
