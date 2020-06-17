import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { baseURL } from '../../utils';

import { AuthContext } from '../../context';
import RippleLoader from '../../components/common/RippleLoader';
import Booking from './Booking';
import NoRecords from '../../components/common/NoRecords';

export default class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      bookings: [],
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
        })
        console.log(bookings);
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
            mutation {
              cancelBooking (bookingId: "${bookingId}") {
                _id
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
          this.setState(prevState => {
            const updatedBookings = prevState.bookings.find(booking => booking._id !== bookingId);
            return {
              bookings: updatedBookings,
            }
          });
          console.log(formattedResponse);
        }
      }
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    const { isLoading, bookings } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Bookings</title>
        </Helmet>
        <div className="columns is-centered is-vcentered is-mobile is-multiline">          
          {
            isLoading && 
            <div className="column is-12 flex-center">
              <h2 className="title has-text-centered has-text-weight-bold">Hold on! We're fetching your bookings...</h2>
              <RippleLoader height='100px' />
            </div>
          }
          {
            !isLoading && (bookings.length ?
            bookings.map((booking, index) => <Booking {...booking} key={index.toString()} cancelBooking={this.cancelBooking} />) :
            <NoRecords title="Oops! You have no bookings" />)
          }
        </div>
      </Fragment>
    )
  }
}