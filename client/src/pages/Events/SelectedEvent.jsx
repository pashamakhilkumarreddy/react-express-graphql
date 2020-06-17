import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/Modal';

const SelectedEvent = ({ _id: id, title, price, description, date, toggleSelectedEventModal, bookEvent }) => {
  const dateString = new Date(date).toDateString();
  const UTCDate = new Date(date).toUTCString();
  return (
    <Modal title={title} toggleModal={toggleSelectedEventModal}>
      <div className="card selected-event" data-id={id}>
        <header className="card-header">
          <div className="card-header-title">
            {title}
          </div>
        </header>
        <div className="card-content">
          <div className="media-content">
            <p className="title is-6">@{title}</p>
            <div className="subtitle is-6">${price}</div>
          </div>
          <div className="content">
            <p className="event-description">{description}</p>
            <time dateTime={dateString} title={dateString} className="event-time">{UTCDate}</time>
          </div>
        </div>
        <footer className="card-footer">
          <button className="card-footer-item button is-danger is-light" onClick={toggleSelectedEventModal}>Cancel</button>
          <button className="card-footer-item button is-primary is-light" data-id={id} onClick={bookEvent}>Book</button>
        </footer>
      </div>
    </Modal>
  )
}

SelectedEvent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  toggleSelectedEventModal: PropTypes.func.isRequired,
  bookEvent: PropTypes.func.isRequired,
}

export default SelectedEvent;
