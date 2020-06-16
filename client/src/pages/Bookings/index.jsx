import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

export default class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Bookings</title>
        </Helmet>
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-12 flex-center">
            <button className="button is-primary is-light has-text-centered">
              Add Booking
            </button>
          </div>
          <div className="column is-12 flex-center">
            {
              this.state.isLoading && <h2 className="title has-text-centered has-text-weight-bold">Hold on! We're fetching your bookings...</h2>
            }
          </div>
        </div>
      </Fragment>
    )
  }
}