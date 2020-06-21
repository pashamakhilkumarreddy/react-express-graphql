import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ title, toggleModal, children }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="title has-text-weight-bold has-text-centered modal-card-title" style={{marginBottom: 0}}>{title}</p>
          <button className="delete" aria-label="close" title="Close Modal" onClick={toggleModal}></button>
        </header>
        <section className="modal-card-body">
          {children}
        </section>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default Modal;
