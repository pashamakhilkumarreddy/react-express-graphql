import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { checkAllFields, baseURL } from '../../utils';
import { AuthContext } from '../../context';
import RippleLoader from '../../components/common/RippleLoader';
import AddEvent from './AddEvent';
import Event from './Event';
import SelectedEvent from './SelectedEvent';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingEvent: false,
      showSelectedEvent: false,
      selectedEvent: null,
      eventTitle: '',
      eventPrice: '',
      eventDate: '',
      eventDescription: '',
      events: [],
      isLoading: false,
      isActive: true,
    }
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchEvents();
  }

  setLoading = (isLoading = false) => {
    this.setState({
      isLoading,
    });
  }

  toggleAddEventModal = () => {
    this.setState({
      addingEvent: !this.state.addingEvent,
      eventTitle: '',
      eventPrice: '',
      eventDate: '',
      eventDescription: '',
      isLoading: false,
    });
  }

  toggleSelectedEventModal = (e, showSelectedEvent = false) => {
    this.setState({
      showSelectedEvent,
    });
  }

  showSelectedEvent = (e) => {
    const { id } = e.target.dataset;
    const selectedEvent = this.state.events.find((event) => event._id === id);
    this.setState({
      selectedEvent,
    })
    this.toggleSelectedEventModal(e, true);
  }

  handleOnChange = (e) => {
    const {
      value,
      name
    } = e.target;
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
        this.setLoading(true);
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
          const {
            creator,
            _id,
            title,
            price,
            date,
            description
          } = formattedResult.data.createEvent;
          const newEvent = {
            _id,
            title,
            price,
            date,
            description,
          }
          if (checkAllFields(Object.values(newEvent))) {
            this.setState({
              events: [...this.state.events, {
                ...newEvent,
                price: parseFloat(newEvent.price),
                creator: {
                  ...creator,
                },
              }],
            });
            this.setState({
              addingEvent: false,
            });
          }
        }
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoading(false);
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
              creator {
                _id
              }
            }
          }
        `
      }
      this.setLoading(true);
      const result = await fetch(`${baseURL}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (result.status === 200) {
        const formattedResult = await result.json();
        if (this.state.isActive) {
          const {
            events
          } = formattedResult.data;
          this.setState({
            events,
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoading(false);
    }
  }

  bookEvent = async (e) => {
    try {
      if (!this.context.token) {
        this.setState({
          selectedEvent: null,
        })
        return;
      }
      e.preventDefault();
      const id = this.state.selectedEvent._id;
      if (id) {
        const requestBody = {
          query: `
            mutation {
              bookEvent (eventId: "${id}") {
                _id
                createdAt
                updatedAt          
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
        if (result.status === 200) {
          const formattedResult = await result.json();
          const { bookEvent } = formattedResult.data;
          console.log(bookEvent);
          this.toggleSelectedEventModal(e, false);
          this.setState({
            selectedEvent: null,
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  componentWillUnmount = () => {
    this.setState({
      isActive: false,
    });
  }
  
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Events</title>
        </Helmet>
        {
          this.state.showSelectedEvent && 
          <SelectedEvent {...this.state.selectedEvent} toggleSelectedEventModal={this.toggleSelectedEventModal} bookEvent={this.bookEvent} />
        }
        {
          this.state.addingEvent && this.context.token && <AddEvent {...this.state} handleOnChange={this.handleOnChange}
          handleOnSubmit={this.handleOnSubmit} toggleModal={this.toggleAddEventModal} />
        }
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-12 flex-center">
            {
              this.context.token && 
              <button className="button is-primary is-light has-text-centered" onClick={this.toggleAddEventModal}>Add a new Event</button>
            }
          </div>
          <div className={'column is-12 flex-center '  + ( this.state.isLoading ? '': 'is-hidden') }>
            {
              this.state.isLoading && 
                <Fragment>
                  <h2 className="title has-text-centered has-text-weight-bold">Hold on! We're fetching your events...</h2>
                  <RippleLoader width='100px' height='100px' />
                </Fragment>
            }
          </div>
          {
            this.state.events.length !== 0 && 
            this.state.events.map((event, index) => 
            <Event {...event} userId={this.context.userId} key={index.toString()} showSelectedEvent={this.showSelectedEvent} />)
          }
        </div>
      </Fragment>
    )
  }
}