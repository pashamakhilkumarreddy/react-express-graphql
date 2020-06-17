import React from 'react';
import PropTypes from 'prop-types';

const Booking = ({ _id, createdAt, event, cancelBooking }) => {
  const date = new Date(createdAt).toDateString();
  const UTCDate = new Date(createdAt).toUTCString();
  return (
    <div className="column is-10">
      <div className="booking box">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p className="event-title">
                {event.title}
              </p>
              <time dateTime={date} title={date}>{UTCDate}</time>
            </div>
          </div>
        </article>
        <div className="action">
          <button className="button is-danger is-light" onClick={cancelBooking.bind(this, _id)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

Booking.propTypes = {
  _id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  cancelBooking: PropTypes.func.isRequired,
}

export default Booking;
