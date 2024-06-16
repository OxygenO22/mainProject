import React from 'react'
import { Modal } from './Modal';

export const ModalWrapper = () => {
  return (
    <Modal>
      <div>
        <p>Hello</p>
      </div>
      <input type="text" placeholder="email" />
      <input type="password" placeholder="pass" />
      <label>
        <input type="checkbox" />
        <span>I agree</span>
      </label>
      <button>send</button>
    </Modal>
  );
}
