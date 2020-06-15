import React, { Component, Fragment } from 'react';

import Modal from '../../components/Modal';
import { checkAllFields, baseURL } from '../../utils';
import { AuthContext } from '../../context';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingEvent: false,
      eventTitle: '',
      eventPrice: '',
      eventDate: '',
      eventDescription: '',
      events: [],
      isLoading: false,
    }
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchEvents();
  }

  toggleAddEventModal = () => {
    this.setState({
      addingEvent: !this.state.addingEvent,
    })
  }

  handleOnChange = (e) => {
    const { value, name } = e.target;
    if (value) {
      this.setState({
        [name]: value,
      })
    }
  }

  handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        eventTitle: title,
        eventPrice: price,
        eventDate: date,
        eventDescription: description
      } = this.state;
      const event = {
        title,
        price,
        date,
        description,
      }
      if (checkAllFields(Object.values(event))) {
        this.setState({
          isLoading: true,
        });
        const requestBody = {
          query: `
              mutation {
                createEvent (eventInput: { title: "${title}", price: ${parseFloat(price)}, date: "${date}", description: "${description}" }) {
                  _id
                  title
                  description
                  date
                  price
                  creator {
                    _id 
                    email
                  }
                }
              }
            `
        }
        const result = await fetch(`${baseURL}`, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.context.token,
          }
        });
        if (result.status === 200 || result.status === 201) {
          const formattedResult = await result.json();
          const { creator, title, price, date, description } = formattedResult.data.createEvent;
          console.log(creator, title, price, date, description);
        }
        return;
      }
    } catch (err) {
      console.error(err);
    }
    finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  fetchEvents = async () => {
    try {
      const requestBody = {
        query: `
          query {
            events {
              _id
              title
              description
              date
              price
            }
          }
        `
      }
      this.setState({
        isLoading: true,
      })
      const result = await fetch(`${baseURL}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (result.status === 200) {
        const formattedResult = await result.json();
        const { events } = this.formattedResult.data;
        this.setState({
          events,
        });
        console.log(formattedResult);
      }
    } catch(err) {
      console.error(err);
    }
    finally {
      this.setState({
        isLoading: false,
      });
    }
  }
  
  render() {
    return (
      <Fragment>
        {
          this.state.addingEvent && this.context.token && 
          (
            <Modal title="Create a new Event" toggleAddEventModal={this.toggleAddEventModal}>
              <form className="form" onSubmit={this.handleOnSubmit} autoComplete="off">
                <div className="field">
                  <label htmlFor="event-title" className="label">Title</label>
                  <div className="control">
                    <input type="text" id="event-title" name="eventTitle" className="input"
                    placeholder="Please enter the event title" value={this.state.eventTitle} required onChange={this.handleOnChange} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="event-price" className="label">Price</label>
                  <div className="control">
                    <input type="number" id="event-price" name="eventPrice" className="input"
                    placeholder="Please enter the event price" value={this.state.eventPrice} required onChange={this.handleOnChange} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="event-date" className="label">Date</label>
                  <div className="control">
                    <input type="date" id="event-date" name="eventDate" className="input"
                    placeholder="Please enter the event date" value={this.state.eventDate} required onChange={this.handleOnChange} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="event-description" className="label">Description</label>
                  <div className="control">
                    <textarea name="eventDescription" id="event-description" className="textarea" cols="30" rows="10"
                    value={this.state.eventDescription} required placeholder="Please enter the event description" onChange={this.handleOnChange}>
                    </textarea>
                  </div>
                </div>
                <div className="buttons">
                  <button className={'button is-success' + (this.state.isLoading ? 'is-loading': '')}>Create</button>
                  <button className="button is-danger is-light" onClick={this.toggleAddEventModal}>Cancel</button>
                </div>
              </form>
            </Modal>
          )
        }
        <div className="columns is-vcentered is-mobile is-multiline">
            <div className="column is-12 flex-center">
              {
                this.context.token && 
                <button className="button is-primary is-light has-text-centered" onClick={this.toggleAddEventModal}>Add Event</button>
              }
            </div>
            <div className="column is-12 flex-center">
              {
                this.state.isLoading && <h2 className="title has-text-centered has-text-weight-bold">Loading...</h2>
              }
            </div>
            {
              this.state.events.length !== 0 && (
                this.state.events.map((event, index) =>                 
                  <div className="column is-10-mobile is-4-tablet is-4-desktop is-4-widescreen is-3-fullhd" key={index.toString()}>
                    <div className="events mt-4">
                      <div className="event box">
                        <article className="media">
                          <div className="media-content">
                            <div className="content">
                              {event.title}
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                )
              )
            }

        </div>
      </Fragment>
    )
  }
}