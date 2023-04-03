import { useState } from 'react';
import { createPortal } from 'react-dom';
import SharedButton from '../../commons/sharedButton/SharedButton';
import css from './modal-header.module.scss';

const ModalHeader = ({ closeModalHeader, logoutConfirm }) => {
  const [openModal] = useState(false);

  const template = (
    <div className={css['overlay']} onClick={closeModalHeader}>
      <div className={css['modal-header']}>
        <button onClick={closeModalHeader} className={css['modal-btnClose']} />
        <p className={css['modal-text']}>Are you sure?</p>
        <div className={css['modal-buttonWrapper']}>
          <SharedButton onClick={logoutConfirm}>Yes</SharedButton>
          <SharedButton type="button" onClick={closeModalHeader}>
            No
          </SharedButton>
        </div>
      </div>
    </div>
  );

  return !openModal ? (
    createPortal(template, document.getElementById('modal'))
  ) : (
    <></>
  );
};

export default ModalHeader;
