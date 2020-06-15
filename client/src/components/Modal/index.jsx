import React from 'react';

const Modal = (props) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="title has-text-weight-bold has-text-centered modal-card-title" style={{marginBottom: 0}}>{props.title}</p>
          <button className="delete" aria-label="close" title="Close Modal" onClick={props.toggleAddEventModal}></button>
        </header>
        <section className="modal-card-body">
          {
            props.children
          }
        </section>
      </div>
    </div>
  )
}

export default Modal;