import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { baseURL } from '../../utils';

import { AuthContext } from '../../context';
import RippleLoader from '../../components/common/RippleLoader';
import Booking from './Booking';
import NoRecords from '../../components/common/NoRecords';
import BookingsChart from './BookingsChart';

export default class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      bookings: [],
      outputType: 'bookings',
    }
  }

  static contextType = AuthContext;

  componentDidMount = () => {
    this.fetchBookings();
  }

  fetchBookings = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const requestBody = {
        query: `
          query {
            bookings {
              _id
              createdAt
              event {
                _id
                title
                date
                price
              }
            }
          }
        `
      };
      const result = await fetch(`${baseURL}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.context.token,
        }
      });
      if (result.status === 200) {
        const formattedResponse = await result.json();
        const { bookings } = formattedResponse.data;
        this.setState({
          bookings,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  cancelBooking = async (bookingId) => {
    try {
      if (bookingId) {
        const requestBody = {
          query: `
            mutation CancelBooking($id: ID!) {
              cancelBooking(bookingId: $id) {
                _id
              }
            }
          `,
          variables: {
            id: bookingId,
          }
        };
        const result = await fetch(`${baseURL}`, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.context.token,
          }
        });
        if (result.status === 200) {
          const formattedResponse = await result.json();
          this.setState(prevState => {
            const updatedBookings = prevState.bookings.filter(booking => booking._id !== bookingId);
            return {
              bookings: updatedBookings,
            }
          });
        }
      }
    } catch(err) {
      console.error(err);
    }
  }

  selectOutputType = (outputType) => {
    const type = (outputType === 'charts') ? 'charts': 'bookings';
    this.setState({
      outputType: type,
    });
  }

  render() {
    const { isLoading, bookings, outputType } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Bookings</title>
        </Helmet>
        <div className={'buttons flex-center ' + (outputType === 'charts' ? 'mb-6': '')}>
          <button className="button is-info" onClick={this.selectOutputType.bind(this, 'bookings')}>Bookings</button>
          <button className="button is-light is-info" onClick={this.selectOutputType.bind(this, 'charts')}>Charts</button>
        </div>
        <div className="columns is-centered is-vcentered is-mobile is-multiline">          
          {
            isLoading && ((outputType === 'bookings') ? 
            (<div className="column is-12 flex-center">
              <h2 className="title has-text-centered has-text-weight-bold">Hold on! We're fetching your bookings...</h2>
              <RippleLoader height='100px' />
            </div>):
            (
              <div className="column is-12 flex-center">
                <h2 className="title has-text-centered has-text-weight-bold">Hold on! We're fetching your charts...</h2>
                <RippleLoader height='100px' />
              </div>
            ))
          }
          {
            !isLoading && (outputType === 'bookings') && (bookings.length ?
            bookings.map((booking, index) => <Booking {...booking} key={index.toString()} cancelBooking={this.cancelBooking} />) :
            <NoRecords title="Oops! You have no bookings" />)
          }

          {
            !isLoading && (outputType === 'charts') && 
            (
              <BookingsChart bookings={bookings} />
            )
          }

        </div>
      </Fragment>
    )
  }
}