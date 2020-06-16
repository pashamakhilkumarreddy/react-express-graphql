import React from 'react';
import PropTypes from 'prop-types';

const Event = ({ _id: id, title, description, price, date, creator: { _id: creatorID}, userId }) => {
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
                <p>${price}</p>
                <p>{description}</p>
                <time className="event-time" dateTime={date} title={new Date(date).toDateString()}>
                  {new Date(date).toUTCString()}
                </time>
              </div>
              <div className="flex-center" style={{ justifyContent: 'flex-start'}}>               
                {
                  (userId === creatorID) ? <p>You created this event!</p> :  <button className="button is-light is-info">View Details</button> 
                }                
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

Event.propTypes = {
  userId: PropTypes.string,
  id: PropTypes.string,
  creatorID: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
}

export default Event;
