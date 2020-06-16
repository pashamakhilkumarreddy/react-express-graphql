import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/Modal';

const AddEvent = ({eventTitle, eventDescription, eventPrice, eventDate, isLoading, handleOnChange, handleOnSubmit, toggleAddEventModal}) => {
  return (
    <Modal title="Create a new Event" toggleAddEventModal={toggleAddEventModal}>
      <form className="form" onSubmit={handleOnSubmit} autoComplete="off">
        <div className="field">
          <label htmlFor="event-title" className="label">Title</label>
          <div className="control">
            <input type="text" id="event-title" name="eventTitle" className="input"
              placeholder="Please enter the event title" value={eventTitle} required
              onChange={handleOnChange} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="event-price" className="label">Price</label>
          <div className="control">
            <input type="number" id="event-price" name="eventPrice" className="input"
              placeholder="Please enter the event price" value={eventPrice} required
              onChange={handleOnChange} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="event-date" className="label">Date</label>
          <div className="control">
            <input type="date" id="event-date" name="eventDate" className="input"
              placeholder="Please enter the event date" value={eventDate} required
              onChange={handleOnChange} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="event-description" className="label">Description</label>
          <div className="control">
            <textarea name="eventDescription" id="event-description" className="textarea" cols="30" rows="10"
              value={eventDescription} required placeholder="Please enter the event description"
              onChange={handleOnChange}>
          </textarea>
          </div>
        </div>
        <div className="buttons">
          <button className={'button is-success ' + (isLoading ? 'is-loading' : '' )}>Create</button>
          <button className="button is-danger is-light" onClick={toggleAddEventModal}>Cancel</button>
        </div>
      </form>
  </Modal>
  )
}

AddEvent.propTypes = {
  eventTitle: PropTypes.string.isRequired,
  eventDescription: PropTypes.string.isRequired,
  eventPrice: PropTypes.any.isRequired,
  eventDate: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  toggleAddEventModal: PropTypes.func.isRequired,
}

export default AddEvent;
