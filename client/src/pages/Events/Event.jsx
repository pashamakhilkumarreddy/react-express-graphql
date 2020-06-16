import React from 'react';
import PropTypes from 'prop-types';

const Event = ({ _id: id, title, description, price, date }) => {
  return (
    <div className="column is-10-mobile is-4-tablet is-4-desktop is-4-widescreen is-3-fullhd" data-id={id}>
      <div className="events mt-4">
        <div className="event box">
          <article className="media">
            <div className="media-content">
              <div className="content">
                <p className="event-name">
                  {title}
                </p>
                <p>{description}</p>
                <p>{price}</p>
                <time className="event-time" dateTime={date} title={new Date(date).toDateString()}>
                  {new Date(date).toDateString()}
                </time>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

Event.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
}

export default Event;
